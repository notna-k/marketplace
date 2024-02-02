import { ArticleCategories } from "../../shared/constants/article-categories";
export declare class GetAllArticlesQueryDto {
    count: number;
    offset: number;
    title: string;
    category: ArticleCategories;
}
