import exp from "constants";
import {User} from "../../users/users.model";


export class UserDto {
    id: number;
    name: string;
    email: string;
    city: string;
    region: string;
    phoneNumber: string;
    groups: string[];
    profilePhoto: string;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.city = user.city;
        this.region = user.region;
        this.phoneNumber = user.phoneNumber;
        this.groups = user.groups;
        this.profilePhoto = user.profilePhoto;
    }
}