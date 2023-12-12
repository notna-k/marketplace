import { Model } from "sequelize-typescript";
import { User } from "../user/user.model";
import { CurrencyType } from "../shared/constants/currency-type";
export interface ArticleCreationAttrs {
    head: string;
    description: string;
    price: number;
    currency: string;
    images: string[];
    userId: number;
}
export declare class Article extends Model<Article, ArticleCreationAttrs> {
    id: number;
    userId: number;
    title: string;
    description: string;
    price: number;
    currency: CurrencyType;
    images: string[];
    user: User;
}
