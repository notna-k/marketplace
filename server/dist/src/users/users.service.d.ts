import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user";
import { UpdateUserDto } from "./dto/update-user";
export declare class UsersService {
    private UserRepository;
    constructor(UserRepository: typeof User);
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User | {
        Error: any;
    }>;
    deleteUser(IdOrEmail: number | string): Promise<any>;
}
