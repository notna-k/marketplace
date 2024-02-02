import { Article } from "./articles.model";
import { CreateArticleBodyDto } from "./dto/create-article-body.dto";
import { ArticleCategories } from "../shared/constants/article-categories";
export declare class ArticlesService {
    private articleRepository;
    constructor(articleRepository: typeof Article);
    getAll(count: number, offset: number, title: string, category?: ArticleCategories): Promise<Article[]>;
    getOne(id: number): Promise<Article>;
    createArticle(dto: CreateArticleBodyDto, userId: number, imageUrls: string[]): Promise<Article>;
    getArticlesCount(): Promise<number>;
}
