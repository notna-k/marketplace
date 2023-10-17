import { JwtService } from "@nestjs/jwt";
import { SignUserDto } from "../users/dto/sign-user";
import { User } from "../users/users.model";
import { CreateUserDto } from "../users/dto/create-user";
import { AuthMailService } from "./auth.mail.service";
export declare class AuthService {
    private jwtService;
    private authMailService;
    constructor(jwtService: JwtService, authMailService: AuthMailService);
    signIn(signUserDto: SignUserDto): Promise<{
        token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<string>;
    validatePassword(password: string, userid: number): Promise<boolean>;
    signedInCheck(token: string): Promise<object>;
    adminSignCheck(token: string): Promise<any>;
    getUserByLink(link: string): Promise<User>;
}
