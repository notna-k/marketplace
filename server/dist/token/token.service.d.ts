import { User } from "../users/users.model";
import { JwtService } from "@nestjs/jwt";
import { UserJwtPayload } from "../shared/dto/auth-user.dto";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
export declare class TokenService {
    private jwtService;
    private config;
    private userService;
    constructor(jwtService: JwtService, config: ConfigService, userService: UsersService);
    createTokens(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    validateAccessToken(accessToken: string): UserJwtPayload;
    validateRefreshToken(refreshToken: string): UserJwtPayload;
    removeRefreshToken(refreshToken: string): Promise<string>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    logout(refreshToken: string): Promise<{
        refreshToken: string;
    }>;
}
