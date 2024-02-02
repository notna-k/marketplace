import { Model } from "sequelize-typescript";
import { User } from "../users/users.model";
import { CurrencyType } from "../shared/constants/currency-type";
import { ArticleCategories } from "../shared/constants/article-categories";
export interface ArticleCreationAttrs {
    title: string;
    description: string;
    price: number;
    currency: string;
    images: string[];
    userId: number;
    category: ArticleCategories;
    date: Date;
}
export declare class Article extends Model<Article, ArticleCreationAttrs> {
    id: number;
    title: string;
    description: string;
    price: number;
    currency: CurrencyType;
    category: ArticleCategories;
    images: string[];
    date: Date;
    userId: number;
    user: User;
}
