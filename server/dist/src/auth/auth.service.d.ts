import { SignUserDto } from "../users/dto/sign-user";
import { CreateUserDto } from "../users/dto/create-user";
export declare class AuthService {
    private refreshJwtService;
    private accessJwtService;
    constructor();
    signIn(signUserDto: SignUserDto): Promise<string>;
    register(createUserDto: CreateUserDto): Promise<string>;
    validatePassword(password: string, userid: number): Promise<boolean>;
    signedInCheck(token: string): Promise<object>;
    adminSignCheck(token: string): Promise<any>;
    refreshAccessToken(refreshToken: string): Promise<string>;
}
