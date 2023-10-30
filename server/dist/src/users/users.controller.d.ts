import { UsersService } from "./users.service";
import { User } from "./users.model";
import { UpdateUserDto } from "./dto/update-user";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    private readonly authService;
    getAll(token: string): Promise<User[]>;
    getById(id: number, token: string): Promise<User>;
    getProfile(req: any): Promise<User>;
    getByEmail(email: string, token: string): Promise<User>;
    updateUser(updateUserDto: UpdateUserDto, token: string): Promise<User>;
    deleteUserById(id: number, token: string): Promise<any>;
    deleteUserByEmail(email: string, token: string): Promise<any>;
}
