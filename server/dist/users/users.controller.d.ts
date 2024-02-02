import { UsersService } from "./users.service";
import { SignInBodyDto } from "./dto/sign-in-body.dto";
import { TokenService } from "../token/token.service";
import { SignUpBodyDto } from "./dto/sign-up-body.dto";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { GetProfileParamDto } from "./dto/get-profile-param-dto";
export declare class UsersController {
    private readonly usersService;
    private readonly tokenService;
    private config;
    constructor(usersService: UsersService, tokenService: TokenService, config: ConfigService);
    getProfile({ id }: GetProfileParamDto): Promise<any>;
    getUserArticles(id: number): Promise<any>;
    signIn({ email, password }: SignInBodyDto, res: Response): Promise<any>;
    signUp(body: SignUpBodyDto, res: Response): Promise<any>;
    refreshToken(req: any): Promise<any>;
    logout(req: any, res: Response): Promise<any>;
}
