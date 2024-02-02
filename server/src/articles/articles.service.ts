import {Injectable} from '@nestjs/common';
import {Article} from "./articles.model";
import {InjectModel} from "@nestjs/sequelize";
import {FileService} from "../file/file.service";
import {Op} from "sequelize"
import {CreateArticleBodyDto} from "./dto/create-article-body.dto";
import {ArticleCategories} from "../shared/constants/article-categories";
import {User} from "../users/users.model";


@Injectable()
export class ArticlesService {

    constructor(@InjectModel(Article) private articleRepository: typeof Article) {
    }

    async getAll(count = 10, offset = 0, title: string, category?: ArticleCategories): Promise<Article[]> {
        const whereClause: any = {
            title: {
                [Op.iLike]: `%${title}%`,
            },
        };

        if (category !== undefined) {
            whereClause.category = category;
        }

        const articles = await Article.findAll({
            offset,
            limit: count,
            where: whereClause,
            order: [['title', 'ASC']],
        });
        return articles;
    }
    async getOne(id: number): Promise<Article>{
        const article = await Article.findByPk(id, {
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }]
        });
        return article;
    }
    async createArticle(dto: CreateArticleBodyDto, userId: number, imageUrls: string[]): Promise<Article>{

        const article = this.articleRepository.create({...dto, userId, images: imageUrls, date: new Date()});
        return article;
    }


    async getArticlesCount():Promise<number>{
        const count = await this.articleRepository.count();
        return count;
    }
}
