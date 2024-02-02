import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {User} from "../users/users.model";
import {JwtService} from "@nestjs/jwt";
import {UserJwtPayload} from "../shared/dto/auth-user.dto";
import {ConfigService} from "@nestjs/config";
import {UsersService} from "../users/users.service";

@Injectable()
export class TokenService{
    constructor(
        private jwtService: JwtService,
        private config: ConfigService,
        @Inject(forwardRef(() => UsersService))private userService: UsersService
    ) {
    }

    async createTokens(user: User): Promise<{accessToken: string, refreshToken: string}>{
        const payload: UserJwtPayload = {
            id: user.id,
            email: user.email,
            isActivated: user.isActivated
        }
        const accessToken = this.jwtService.sign(payload, {
            secret: this.config.get("JWT_ACCESS_SECRET"), expiresIn: this.config.get("JWT_ACCESS_EXPIRES")
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: this.config.get("JWT_REFRESH_SECRET"), expiresIn: this.config.get("JWT_REFRESH_EXPIRES")
        });
        return {accessToken, refreshToken};
    }

    validateAccessToken(accessToken: string): UserJwtPayload{
        const payload = this.jwtService.verify<UserJwtPayload>(accessToken, {secret: this.config.get("JWT_ACCESS_SECRET")});
        return payload;
    }

    validateRefreshToken(refreshToken: string): UserJwtPayload{
        const payload = this.jwtService.verify<UserJwtPayload>(refreshToken, {secret: this.config.get("JWT_REFRESH_SECRET")});
        return payload;
    }

    async removeRefreshToken(refreshToken: string): Promise<string>{
        const payload = await this.validateRefreshToken(refreshToken);
        const {id} = payload;
        const dbRefreshToken = await this.userService.getRefreshToken(id);
        const dbPayload = await this.validateRefreshToken(dbRefreshToken);

        if(dbPayload && (refreshToken === dbRefreshToken)){
            const refreshToken = this.userService.removeRefreshToken(id);
            return refreshToken;
        }
    }

    async refreshToken(refreshToken: string):Promise<{ accessToken: string }>{
        const payload = this.validateRefreshToken(refreshToken);
        const {id, email, isActivated} = payload;
        const dbRefreshToken = await this.userService.getRefreshToken(id);
        const dbPayload = this.validateRefreshToken(dbRefreshToken);

        if(dbPayload && (refreshToken === dbRefreshToken)){
            const accessToken = this.jwtService.sign({id, email, isActivated}, {
                secret: this.config.get("JWT_ACCESS_SECRET"), expiresIn: this.config.get("JWT_ACCESS_EXPIRES")
            })
            return {accessToken};
        }
    }

    async logout(refreshToken: string): Promise<{refreshToken: string}>{
        const payload = this.validateRefreshToken(refreshToken);
        const {id, email, isActivated} = payload;
        const dbRefreshToken = await this.userService.getRefreshToken(id);
        if(dbRefreshToken === refreshToken){
            const token = await this.userService.removeRefreshToken(id);
            return {refreshToken: token}
        }
    }


}