import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export declare class AdminAuthGuard implements CanActivate {
    private jwtService;
    constructor(jwtService: JwtService);
    private usersService;
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
