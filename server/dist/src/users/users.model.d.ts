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
    profilePhotos: string[];
    description: string;
    groups: string[];
    banned: boolean;
    banReason: string;
    region: string;
    city: string;
    articles: Article[];
    isActivated: boolean;
    refreshToken: string;
    activationLink: string;
}
export {};
