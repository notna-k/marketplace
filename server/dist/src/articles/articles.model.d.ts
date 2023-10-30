import { Model } from "sequelize-typescript";
import { User } from "../users/users.model";
interface ArticleCreationAttrs {
    head: string;
    description: string;
    price: number;
    currency: string;
    postPhotos: string[];
}
export declare class Article extends Model<Article, ArticleCreationAttrs> {
    id: number;
    userId: number;
    head: string;
    description: string;
    price: number;
    currency: string;
    postPhotos: string[];
    user: User;
}
export {};
