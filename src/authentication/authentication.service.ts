import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from "src/users/users.service"

@Injectable()
export class AuthenticationService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    public async verify(token: string) {
        return this.jwtService.verify(token);
    }

    public async validateByPayload(payload) {
        return this.usersService.validateByPayload(payload);
    }

    async validateUser(preferredUsername: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByPreferredUsernameAndPassword(preferredUsername, password);
        if (user) {
            return user;
        }
        return null;
    }

    async login(preferredUsername: string, password: string) {
        const validatedUser = await this.validateUser(preferredUsername, password);
        if (validatedUser) {
            const { id, preferredUsername, ...userData } = validatedUser;
            const user: Partial<any> = {
                id,
                preferredUsername
            };
            return {
                user: {...userData, id, preferredUsername},
                access_token: this.jwtService.sign(user)
            }
        } else {
            return null;
        }
    }
}
