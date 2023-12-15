import { UserService } from "./user.service";
import { SignInBodyDto } from "./dto/sign-in-body.dto";
import { TokenService } from "../token/token.service";
import { SignUpBodyDto } from "./dto/sign-up-body.dto";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { UserJwtPayload } from "../shared/dto/auth-user.dto";
export declare class UserController {
    private readonly usersService;
    private readonly tokenService;
    private config;
    constructor(usersService: UserService, tokenService: TokenService, config: ConfigService);
    getProfile(user: UserJwtPayload): Promise<any>;
    getUserArticles(id: number): Promise<any>;
    signIn({ email, password }: SignInBodyDto, res: Response): Promise<any>;
    signUp(body: SignUpBodyDto, res: Response): Promise<any>;
    refreshToken(req: any): Promise<any>;
}
