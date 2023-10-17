import { SignUserDto } from "../users/dto/sign-user";
import { CreateUserDto } from "../users/dto/create-user";
import { AuthService } from "./auth.service";
import { AuthMailService } from "./auth.mail.service";
import { AuthTokenService } from "./auth.token.service";
import { User } from "../users/users.model";
import { Response } from 'express';
export declare class AuthController {
    private authService;
    private authMailService;
    private authTokenService;
    constructor(authService: AuthService, authMailService: AuthMailService, authTokenService: AuthTokenService);
    register(createUserDto: CreateUserDto, response: Response): Promise<any>;
    login(signUserDto: SignUserDto): any;
    activate(link: string): Promise<User>;
}
