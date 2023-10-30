import { CreateArticleDto } from "./dto/create-article";
import { Article } from "./articles.model";
export declare class ArticlesService {
    private ArticleRepository;
    constructor(ArticleRepository: typeof Article);
    getAll(): Promise<Article[]>;
    createArticle(createArticleDto: CreateArticleDto): Promise<Article>;
}
