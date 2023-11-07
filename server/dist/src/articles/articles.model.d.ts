import { Model } from "sequelize-typescript";
import { User } from "../users/users.model";
export interface ArticleCreationAttrs {
    head: string;
    description: string;
    price: number;
    currency: string;
    pictures: string[];
    userId: number;
}
export declare class Article extends Model<Article, ArticleCreationAttrs> {
    id: number;
    userId: number;
    head: string;
    description: string;
    price: number;
    currency: string;
    pictures: string[];
    user: User;
}
