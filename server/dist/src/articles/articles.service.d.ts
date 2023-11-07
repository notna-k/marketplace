/// <reference types="multer" />
import { CreateArticleDto } from "./dto/create-article";
import { Article } from "./articles.model";
import { FileService } from "../file/file.service";
export declare class ArticlesService {
    private articleRepository;
    private fileService;
    constructor(articleRepository: typeof Article, fileService: FileService);
    getAll(count?: number, offset?: number): Promise<Article[]>;
    search(query: string): Promise<Article[]>;
    createArticle(createArticleDto: CreateArticleDto, userId: number, pictures: Express.Multer.File[]): Promise<Article>;
}
