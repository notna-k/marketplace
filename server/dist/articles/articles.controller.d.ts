import { ArticlesService } from "./articles.service";
import { GetAllArticlesQueryDto } from "./dto/get-all-articles-query.dto";
import { CreateArticleBodyDto } from "./dto/create-article-body.dto";
import { FileService } from "../file/file.service";
import { GetArticleParamDto } from "./dto/get-article-param.dto";
import { UserJwtPayload } from "../shared/dto/auth-user.dto";
export declare class ArticlesController {
    private readonly articlesService;
    private readonly fileService;
    constructor(articlesService: ArticlesService, fileService: FileService);
    getAllArticles({ count, offset, title }: GetAllArticlesQueryDto): Promise<any>;
    getArticle({ id }: GetArticleParamDto): Promise<any>;
    createArticle(body: CreateArticleBodyDto, user: UserJwtPayload, files: any): Promise<any>;
}
