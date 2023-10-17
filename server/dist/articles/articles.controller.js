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
const auth_service_1 = require("../auth/auth.service");
const create_article_1 = require("./dto/create-article");
let ArticlesController = class ArticlesController {
    constructor(articlesService) {
        this.articlesService = articlesService;
    }
    async getAll() {
        const articles = this.articlesService.getAll();
        return articles;
    }
    async createArticle(createArticleDto, token) {
        const payload = this.authService.signedInCheck(token);
        const userId = payload['id'];
        const newDto = { ...createArticleDto, userId: userId };
        const articles = this.articlesService.createArticle(newDto);
        return articles;
    }
};
exports.ArticlesController = ArticlesController;
__decorate([
    (0, common_1.Inject)(auth_service_1.AuthService),
    __metadata("design:type", auth_service_1.AuthService)
], ArticlesController.prototype, "authService", void 0);
__decorate([
    (0, common_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)("jwt")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_1.CreateArticleDto, String]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "createArticle", null);
exports.ArticlesController = ArticlesController = __decorate([
    (0, common_1.Controller)('/articles'),
    __metadata("design:paramtypes", [articles_service_1.ArticlesService])
], ArticlesController);
//# sourceMappingURL=articles.controller.js.map