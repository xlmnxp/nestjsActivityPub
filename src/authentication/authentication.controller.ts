import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}
    @Post("login")
    async login(@Body("username") username: string, @Body("password") password: string) {
        return this.authenticationService.login(username, password)
    }
}
