import {Injectable} from '@nestjs/common';
import {CreateArticleDto} from "./dto/create-article";
import {Article, ArticleCreationAttrs} from "./articles.model";
import {InjectModel} from "@nestjs/sequelize";
import {FileService, FileType} from "../file/file.service";
import {Op} from "sequelize"

@Injectable()
export class ArticlesService {

    constructor(@InjectModel(Article) private articleRepository: typeof Article,
                private fileService: FileService) {
    }

    async getAll(count: number = 10, offset: number = 0): Promise<Article[]>{
        const articles = this.articleRepository.findAll({offset, limit: count});
        return articles;
    }

    async search(query: string){
        const articles = this.articleRepository.findAll({where: {
            head: {[Op.iRegexp] : query}
        }})
        return articles;
    }
    async createArticle(createArticleDto: CreateArticleDto, userId: number, pictures: Express.Multer.File[]): Promise<Article>{
        const {head, price, description, currency} = createArticleDto;

        let picturesStrs: string[] = [];
        for(const file of pictures){
            const TypeAndName =  await this.fileService.createFile(FileType.IMAGE, file);
            const fileName = TypeAndName.split("/").pop();
            picturesStrs.push(fileName);
        }
        const artileCreationAttrs: ArticleCreationAttrs = {pictures: picturesStrs, head, price, description, currency, userId};

        const article = this.articleRepository.create(artileCreationAttrs);

        return article;
    }
}
