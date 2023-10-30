import { SignUserDto } from "../users/dto/sign-user";
import { CreateUserDto } from "../users/dto/create-user";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<string | {
        Error: any;
    }>;
    login(signUserDto: SignUserDto): Promise<string> | {
        Error: any;
    };
}
