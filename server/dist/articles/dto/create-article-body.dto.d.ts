import { ArticleCategories } from "../../shared/constants/article-categories";
export declare class CreateArticleBodyDto {
    title: string;
    description: string;
    price: number;
    currency: string;
    category: ArticleCategories;
}
