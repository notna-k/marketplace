import {
    Body,
    Controller,
    Get,
    HttpException, HttpStatus,
    Param,
    Post,
    Query, Req, UploadedFile, UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ArticlesService} from "./articles.service";
import {FileFieldsInterceptor, FileInterceptor} from "@nestjs/platform-express";
import {AuthGuard} from "../shared/guards/auth-guard";
import {GetAllArticlesQueryDto} from "./dto/get-all-articles-query.dto";
import {CreateArticleBodyDto} from "./dto/create-article-body.dto";
import {FileService, FileType} from "../file/file.service";
import {GetArticleParamDto} from "./dto/get-article-param.dto";
import {UserJwtPayload} from "../shared/dto/auth-user.dto";
import {User} from "src/shared/decorators/user.decorator"
import {ValidationError} from "class-validator";

@Controller('/articles')
export class ArticlesController {

    constructor(private readonly articlesService : ArticlesService,
                private readonly fileService: FileService
    ) {}


    @Get()
    async getAllArticles(@Query() {count = 10, offset = 0, title = ""}: GetAllArticlesQueryDto): Promise<any>{
        const articles = await this.articlesService.getAll(count, offset, title);

        return articles;
    }

    @Get(":id")
    async getArticle(@Param() {id}: GetArticleParamDto): Promise<any>{
        const article = await this.articlesService.getOne(id);

        if(!article) throw new HttpException("Article not found", HttpStatus.NOT_FOUND);

    }

    @Post("/create")
    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        {name:"image", maxCount:10}
    ]))
    async createArticle(@Body() body: CreateArticleBodyDto,
                        @User() user: UserJwtPayload,
                        @UploadedFiles() files: any): Promise<any>{
        if(!files) throw new HttpException("No images provided", HttpStatus.BAD_REQUEST);

        const {id} = user;
        const imageUrls = await Promise.all(files.image.map(async (file: Express.Multer.File) => {
            return await this.fileService.createFile(FileType.IMAGE, file);
        }));

        const article = await this.articlesService.createArticle(body, id, imageUrls);
        return article;
    }

}
