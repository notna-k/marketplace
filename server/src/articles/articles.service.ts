import {Injectable} from '@nestjs/common';
import {Article} from "./articles.model";
import {InjectModel} from "@nestjs/sequelize";
import {FileService} from "../file/file.service";
import {Op} from "sequelize"
import {CreateArticleBodyDto} from "./dto/create-article-body.dto";


@Injectable()
export class ArticlesService {

    constructor(@InjectModel(Article) private articleRepository: typeof Article) {
    }

    async getAll(count = 10, offset = 0, title: string): Promise<Article[]> {
        const articles = await Article.findAll({
            offset,
            limit: count,
            where: {
                title: {
                    [Op.iLike]: `%${title}%`,
                },
            },
            order: [
                ['title', 'ASC'],
            ],
        });
        return articles;
    }
    async getOne(id: number): Promise<Article>{
        const articles = this.articleRepository.findByPk(id);
        return articles;
    }
    async createArticle(dto: CreateArticleBodyDto, userId: number, imageUrls: string[]): Promise<Article>{

        const article = this.articleRepository.create({...dto, userId, images: imageUrls, date: new Date()});
        return article;
    }
}
