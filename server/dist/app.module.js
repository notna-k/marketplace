"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const users_model_1 = require("./users/users.model");
const process = require("process");
const articles_module_1 = require("./articles/articles.module");
const articles_model_1 = require("./articles/articles.model");
const file_service_1 = require("./file/file.service");
const file_module_1 = require("./file/file.module");
const serve_static_1 = require("@nestjs/serve-static");
const path = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [file_service_1.FileService],
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.resolve(__dirname, '..', 'static', 'image'),
                exclude: ['/api/(.*)'],
                serveRoot: "/static/image"
            }), config_1.ConfigModule.forRoot({
                envFilePath: '.env',
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [users_model_1.User, articles_model_1.Article],
                autoLoadModels: true
            }),
            users_module_1.UsersModule,
            articles_module_1.ArticlesModule,
            file_module_1.FileModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map