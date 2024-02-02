import { User } from "./users.model";
import { SignUpBodyDto } from "./dto/sign-up-body.dto";
export declare class UsersService {
    private userRepository;
    constructor(userRepository: typeof User);
    getUserById(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    createUser({ password, email, name }: SignUpBodyDto): Promise<User>;
    getRefreshToken(userId: number): Promise<string>;
    saveRefreshToken(refreshToken: string, userId: number): Promise<User>;
    removeRefreshToken(userId: number): Promise<string>;
    validatePassword(password: string, hashedPassword: string): boolean;
}
