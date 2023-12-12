import { Article } from "./articles.model";
import { CreateArticleBodyDto } from "./dto/create-article-body.dto";
export declare class ArticlesService {
    private articleRepository;
    constructor(articleRepository: typeof Article);
    getAll(count: number, offset: number, title: string): Promise<Article[]>;
    getOne(id: number): Promise<Article>;
    createArticle(dto: CreateArticleBodyDto, userId: number, imageUrls: string[]): Promise<Article>;
}
