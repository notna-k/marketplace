import { User } from "../../users/users.model";
export declare class UserDto {
    id: number;
    name: string;
    email: string;
    city: string;
    region: string;
    phoneNumber: string;
    groups: string[];
    profilePhoto: string;
    constructor(user: User);
}
