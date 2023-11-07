import {
    Body,
    Controller,
    Get,
    Headers,
    Inject,
    Post, Query,
    Request,
    UploadedFile, UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {ArticlesService} from "./articles.service";
import {AuthService} from "../auth/auth.service";
import {CreateArticleDto} from "./dto/create-article";
import {Article} from "./articles.model";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {AuthGuard} from "../auth/auth.guard";

@Controller('/articles')
export class ArticlesController {

    constructor(private readonly articlesService : ArticlesService
    ) {}


    @Get("/")
    async getAll(@Query("count") count:number,
                 @Query("offset") offset: number){
        const articles = this.articlesService.getAll(count, offset);
        return articles;
    }

    @Get("/search")
    async search(@Query("query") query: string): Promise<Article[]>{
        const articles = this.articlesService.search(query);
        return articles;
    }

    @Post("/create")
    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 10}
    ]))
    async createArticle(@Request() req, @Body() createArticleDto: CreateArticleDto,
                        @UploadedFiles() files,

    ):Promise<Article>{
        try {
            const userId = req.payload['id'];
            const {picture} = files;


            const articles = this.articlesService.createArticle(createArticleDto, userId, picture);
            return articles;
        } catch(e) {console.log(e);}
    }

}
