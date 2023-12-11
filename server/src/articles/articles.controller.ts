import {
    Body,
    Controller,
    Get,
    HttpException, HttpStatus,
    Post, Query,
    Request,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ArticlesService} from "./articles.service";
import {CreateArticleDto} from "./dto/create-article";
import {Article} from "./articles.model";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {AuthGuard} from "../shared/guards/auth-guard";

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
    async search(@Query("query") query: string): Promise<Article[] | HttpException>{
        try{
            const articles = this.articlesService.search(query);
            return articles;
        } catch (e){

            return new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }

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
