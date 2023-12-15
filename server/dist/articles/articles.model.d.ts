import { Model } from "sequelize-typescript";
import { User } from "../user/user.model";
import { CurrencyType } from "../shared/constants/currency-type";
export interface ArticleCreationAttrs {
    title: string;
    description: string;
    price: number;
    currency: string;
    images: string[];
    userId: number;
    date: Date;
}
export declare class Article extends Model<Article, ArticleCreationAttrs> {
    id: number;
    title: string;
    description: string;
    price: number;
    currency: CurrencyType;
    images: string[];
    date: Date;
    userId: number;
    user: User;
}
