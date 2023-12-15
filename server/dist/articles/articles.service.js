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
const sequelize_2 = require("sequelize");
let ArticlesService = class ArticlesService {
    constructor(articleRepository) {
        this.articleRepository = articleRepository;
    }
    async getAll(count = 10, offset = 0, title) {
        const articles = await articles_model_1.Article.findAll({
            offset,
            limit: count,
            where: {
                title: {
                    [sequelize_2.Op.iLike]: `%${title}%`,
                },
            },
            order: [
                ['title', 'ASC'],
            ],
        });
        return articles;
    }
    async getOne(id) {
        const articles = this.articleRepository.findByPk(id);
        return articles;
    }
    async createArticle(dto, userId, imageUrls) {
        const article = this.articleRepository.create({ ...dto, userId, images: imageUrls, date: new Date() });
        return article;
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(articles_model_1.Article)),
    __metadata("design:paramtypes", [Object])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map