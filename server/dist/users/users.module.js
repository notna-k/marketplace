"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("./users.model");
const jwt_1 = require("@nestjs/jwt");
const articles_model_1 = require("../articles/articles.model");
const token_module_1 = require("../token/token.module");
const token_service_1 = require("../token/token.service");
const config_1 = require("@nestjs/config");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, token_service_1.TokenService],
        exports: [users_service_1.UsersService],
        imports: [
            sequelize_1.SequelizeModule.forFeature([users_model_1.User, articles_model_1.Article]),
            jwt_1.JwtModule,
            config_1.ConfigModule,
            config_1.ConfigModule.forRoot(),
            (0, common_1.forwardRef)(() => token_module_1.TokenModule)
        ]
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map