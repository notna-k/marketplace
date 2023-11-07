import { UsersService } from "./users.service";
import { User } from "./users.model";
import { UpdateUserDto } from "./dto/update-user";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    private readonly authService;
    getAll(token: string): Promise<User[]>;
    getById(id: number, token: string): Promise<User>;
    getProfile(req: any): Promise<{
        name: string;
        email: string;
        phoneNumber: string;
        city: string;
        region: string;
        profilePhotos: string[];
        banned: boolean;
        banReason: string;
        createdAt: any;
        Error?: undefined;
    } | {
        Error: any;
        name?: undefined;
        email?: undefined;
        phoneNumber?: undefined;
        city?: undefined;
        region?: undefined;
        profilePhotos?: undefined;
        banned?: undefined;
        banReason?: undefined;
        createdAt?: undefined;
    }>;
    getByEmail(email: string, token: string): Promise<User | {
        Error: any;
    }>;
    updateUser(updateUserDto: UpdateUserDto, token: string, res: any): Promise<any>;
    deleteUserById(id: number, token: string): Promise<any>;
    deleteUserByEmail(email: string, token: string): Promise<any>;
}
