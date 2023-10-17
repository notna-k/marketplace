"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const process = require("process");
const auth_controller_1 = require("./auth.controller");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_mail_service_1 = require("./auth.mail.service");
const auth_token_service_1 = require("./auth.token.service");
const jwtFactory = {
    useFactory: async (configService) => ({
        secret: process.env.JWT_SECRET || 'secret',
        signOptions: {
            expiresIn: process.env.JWT_EXPIRATION_TIME || '24h',
        },
    }),
    inject: [config_1.ConfigService],
};
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'secret',
                signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || "48h" },
            }),
        ],
        providers: [auth_service_1.AuthService, auth_mail_service_1.AuthMailService, auth_token_service_1.AuthTokenService],
        exports: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map