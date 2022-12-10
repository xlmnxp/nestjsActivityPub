import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(public readonly reflector: Reflector) {
        super();
    }

    handleRequest(err, user, info, context: ExecutionContext) {
        if (user) {
            return user;
        } else if (this.reflector.get<string[]>('public', context.getHandler())) {
            return true
        }
        throw new UnauthorizedException();
    }
}