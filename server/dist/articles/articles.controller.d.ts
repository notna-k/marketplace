import { HttpException } from '@nestjs/common';
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article";
import { Article } from "./articles.model";
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    getAll(count: number, offset: number): Promise<Article[]>;
    search(query: string): Promise<Article[] | HttpException>;
    createArticle(req: any, createArticleDto: CreateArticleDto, files: any): Promise<Article>;
}
