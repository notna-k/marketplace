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
const create_article_1 = require("./dto/create-article");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../shared/guards/auth-guard");
let ArticlesController = class ArticlesController {
    constructor(articlesService) {
        this.articlesService = articlesService;
    }
    async getAll(count, offset) {
        const articles = this.articlesService.getAll(count, offset);
        return articles;
    }
    async search(query) {
        try {
            const articles = this.articlesService.search(query);
            return articles;
        }
        catch (e) {
            return new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createArticle(req, createArticleDto, files) {
        try {
            const userId = req.payload['id'];
            const { picture } = files;
            const articles = this.articlesService.createArticle(createArticleDto, userId, picture);
            return articles;
        }
        catch (e) {
            console.log(e);
        }
    }
};
exports.ArticlesController = ArticlesController;
__decorate([
    (0, common_1.Get)("/"),
    __param(0, (0, common_1.Query)("count")),
    __param(1, (0, common_1.Query)("offset")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("/search"),
    __param(0, (0, common_1.Query)("query")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "search", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'picture', maxCount: 10 }
    ])),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_article_1.CreateArticleDto, Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "createArticle", null);
exports.ArticlesController = ArticlesController = __decorate([
    (0, common_1.Controller)('/articles'),
    __metadata("design:paramtypes", [articles_service_1.ArticlesService])
], ArticlesController);
//# sourceMappingURL=articles.controller.js.map