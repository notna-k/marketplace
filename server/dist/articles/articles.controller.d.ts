import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article";
import { Article } from "./articles.model";
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    private readonly authService;
    getAll(): Promise<Article[]>;
    createArticle(createArticleDto: CreateArticleDto, token: string): Promise<Article>;
}
