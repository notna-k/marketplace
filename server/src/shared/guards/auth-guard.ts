import {Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus} from '@nestjs/common';
import {TokenService} from "../../token/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private tokenService: TokenService) {}

    canActivate(context: ExecutionContext): boolean{
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new HttpException("Not authorized", HttpStatus.UNAUTHORIZED);
        }

        const accessToken = authHeader.split(' ').at(1)

        if (!accessToken) {
            throw new HttpException("Not authorized", HttpStatus.UNAUTHORIZED)
        }
        try {
            const payload = this.tokenService.validateAccessToken(accessToken);
            request.user = payload;
            return true;
        } catch (e) {
            throw new HttpException("Not authorized", HttpStatus.UNAUTHORIZED)
        }
    }
}
