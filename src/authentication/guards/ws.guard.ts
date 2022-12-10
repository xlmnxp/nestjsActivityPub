import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Socket } from "socket.io";
import { JwtAuthGuard } from "./jwt.guard";
import { AuthenticationService } from "../authentication.service";

@Injectable()
export class WsAuthGuard extends JwtAuthGuard {
  constructor(private authenticationService: AuthenticationService, private readonly _reflector: Reflector) {
    super(_reflector);
  }
  
  async canActivate(context: ExecutionContext) {
    const token = context.switchToWs().getClient<Socket>().handshake.query.token;
    const payload = await this.authenticationService.verify(token as string);
    const user = await this.authenticationService.validateByPayload(payload);
    if (user) {
      context.switchToWs().getClient<Socket>().handshake["user"] = user;
      return true;
    }
    if (this.reflector.get<string[]>('public', context.getHandler())) {
      return true
    }
    return false;
  }
}