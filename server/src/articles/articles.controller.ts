import {Body, Controller, Get, Headers, Inject, Post} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {ArticlesService} from "./articles.service";
import {AuthService} from "../auth/auth.service";
import {CreateArticleDto} from "./dto/create-article";
import {Article} from "./articles.model";

@Controller('/articles')
export class ArticlesController {

    constructor(private readonly articlesService : ArticlesService,

    ) {}

    @Inject(AuthService)
    private readonly authService: AuthService;
    @Get("/")
    async getAll(){
        const articles = this.articlesService.getAll();
        return articles;
    }

    @Post("/create")
    async createArticle(@Body() createArticleDto: CreateArticleDto,
                        @Headers("jwt") token: string):Promise<Article>{
        const payload = this.authService.signedInCheck(token);
        const userId = payload['id'];
        const newDto = {...createArticleDto, userId: userId};

        const articles = this.articlesService.createArticle(newDto);
        return articles;
    }

}
