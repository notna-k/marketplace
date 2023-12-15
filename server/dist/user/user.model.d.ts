import { Model } from "sequelize-typescript";
import { Article } from "../articles/articles.model";
interface UserCreationAttrs {
    name: string;
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    profilePhoto: string;
    groups: string[];
    region: string;
    city: string;
    isActivated: boolean;
    refreshToken: string;
    activationLink: string;
    articles: Article[];
}
export {};
