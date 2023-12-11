"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesModule = void 0;
const common_1 = require("@nestjs/common");
const articles_service_1 = require("./articles.service");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../user/user.model");
const jwt_1 = require("@nestjs/jwt");
const articles_model_1 = require("./articles.model");
const file_service_1 = require("../file/file.service");
const articles_controller_1 = require("./articles.controller");
const token_module_1 = require("../shared/token/token.module");
let ArticlesModule = class ArticlesModule {
};
exports.ArticlesModule = ArticlesModule;
exports.ArticlesModule = ArticlesModule = __decorate([
    (0, common_1.Module)({
        controllers: [articles_controller_1.ArticlesController],
        providers: [articles_service_1.ArticlesService, file_service_1.FileService],
        imports: [
            sequelize_1.SequelizeModule.forFeature([articles_model_1.Article, user_model_1.User]),
            jwt_1.JwtModule,
            token_module_1.TokenModule
        ]
    })
], ArticlesModule);
//# sourceMappingURL=articles.module.js.map