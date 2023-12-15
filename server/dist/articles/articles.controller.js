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
exports.ArticlesController = void 0;
const common_1 = require("@nestjs/common");
const articles_service_1 = require("./articles.service");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../shared/guards/auth-guard");
const get_all_articles_query_dto_1 = require("./dto/get-all-articles-query.dto");
const create_article_body_dto_1 = require("./dto/create-article-body.dto");
const file_service_1 = require("../file/file.service");
const get_article_param_dto_1 = require("./dto/get-article-param.dto");
const auth_user_dto_1 = require("../shared/dto/auth-user.dto");
const user_decorator_1 = require("../shared/decorators/user.decorator");
let ArticlesController = class ArticlesController {
    constructor(articlesService, fileService) {
        this.articlesService = articlesService;
        this.fileService = fileService;
    }
    async getAllArticles({ count = 10, offset = 0, title = "" }) {
        const articles = await this.articlesService.getAll(count, offset, title);
        return articles;
    }
    async getArticle({ id }) {
        const article = await this.articlesService.getOne(id);
        if (!article)
            throw new common_1.HttpException("Article not found", common_1.HttpStatus.NOT_FOUND);
    }
    async createArticle(body, user, files) {
        if (!files)
            throw new common_1.HttpException("No images provided", common_1.HttpStatus.BAD_REQUEST);
        const { id } = user;
        const imageUrls = await Promise.all(files.image.map(async (file) => {
            return await this.fileService.createFile(file_service_1.FileType.IMAGE, file);
        }));
        const article = await this.articlesService.createArticle(body, id, imageUrls);
        return article;
    }
};
exports.ArticlesController = ArticlesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_all_articles_query_dto_1.GetAllArticlesQueryDto]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "getAllArticles", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_article_param_dto_1.GetArticleParamDto]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "getArticle", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "image", maxCount: 10 }
    ])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_body_dto_1.CreateArticleBodyDto,
        auth_user_dto_1.UserJwtPayload, Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "createArticle", null);
exports.ArticlesController = ArticlesController = __decorate([
    (0, common_1.Controller)('/articles'),
    __metadata("design:paramtypes", [articles_service_1.ArticlesService,
        file_service_1.FileService])
], ArticlesController);
//# sourceMappingURL=articles.controller.js.map