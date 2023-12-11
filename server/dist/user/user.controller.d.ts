import { UserService } from "./user.service";
import { SignInBodyDto } from "./dto/sign-in-body.dto";
import { TokenService } from "../shared/token/token.service";
import { SignUpBodyDto } from "./dto/sign-up-body.dto";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { AuthUserDto } from "../shared/dto/auth-user.dto";
export declare class UserController {
    private readonly usersService;
    private readonly tokenService;
    private config;
    constructor(usersService: UserService, tokenService: TokenService, config: ConfigService);
    getProfile(body: AuthUserDto): Promise<any>;
    signIn({ email, password }: SignInBodyDto, res: Response): Promise<any>;
    signUp(body: SignUpBodyDto, res: Response): Promise<any>;
    refreshToken(req: any): Promise<any>;
}
