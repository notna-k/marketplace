import { Injectable } from '@nestjs/common';
import {CreateArticleDto} from "./dto/create-article";
import {Article} from "./articles.model";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../users/users.model";

@Injectable()
export class ArticlesService {

    constructor(@InjectModel(User) private ArticleRepository: typeof Article) {
    }

    async getAll(): Promise<Article[]>{
        const articles = this.ArticleRepository.findAll();
        return articles;
    }
    async createArticle(createArticleDto: CreateArticleDto): Promise<Article>{
        const article = this.ArticleRepository.create(createArticleDto);
        return article;
    }
}
