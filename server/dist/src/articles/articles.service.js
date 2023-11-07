"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const articles_model_1 = require("./articles.model");
const sequelize_1 = require("@nestjs/sequelize");
const file_service_1 = require("../file/file.service");
const sequelize_2 = require("sequelize");
let ArticlesService = class ArticlesService {
    constructor(articleRepository, fileService) {
        this.articleRepository = articleRepository;
        this.fileService = fileService;
    }
    async getAll(count = 10, offset = 0) {
        const articles = this.articleRepository.findAll({ offset, limit: count });
        return articles;
    }
    async search(query) {
        const articles = this.articleRepository.findAll({ where: {
                head: { [sequelize_2.Op.iRegexp]: query }
            } });
        return articles;
    }
    async createArticle(createArticleDto, userId, pictures) {
        const { head, price, description, currency } = createArticleDto;
        let picturesStrs = [];
        for (const file of pictures) {
            const TypeAndName = await this.fileService.createFile(file_service_1.FileType.IMAGE, file);
            const fileName = TypeAndName.split("/").pop();
            picturesStrs.push(fileName);
        }
        const artileCreationAttrs = { pictures: picturesStrs, head, price, description, currency, userId };
        const article = this.articleRepository.create(artileCreationAttrs);
        return article;
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(articles_model_1.Article)),
    __metadata("design:paramtypes", [Object, file_service_1.FileService])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map