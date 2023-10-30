
import {
    CanActivate,
    ExecutionContext, ForbiddenException, Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {ConfigService} from "@nestjs/config";
import {ACCESS_SECRET} from "../../constants";
import {UsersService} from "../users/users.service";
import {User} from "../users/users.model";

@Injectable()
export class AdminAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    @Inject()
    private usersService: UsersService;

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new ForbiddenException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: ACCESS_SECRET
                }
            );
            const user: User = await this.usersService.getUserById(payload.id);
            const groups = user.groups;
            if (!groups.includes("ADMIN")) throw new ForbiddenException();

            request['payload'] = payload;
        } catch {
            throw new ForbiddenException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
