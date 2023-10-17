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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const sign_user_1 = require("../users/dto/sign-user");
const create_user_1 = require("../users/dto/create-user");
const auth_service_1 = require("./auth.service");
const auth_mail_service_1 = require("./auth.mail.service");
const auth_token_service_1 = require("./auth.token.service");
const process = require("process");
let AuthController = class AuthController {
    constructor(authService, authMailService, authTokenService) {
        this.authService = authService;
        this.authMailService = authMailService;
        this.authTokenService = authTokenService;
    }
    async register(createUserDto, response) {
        try {
            const token = await this.authService.register(createUserDto);
            const jwtExp = Number(process.env.JWT_EXPIRATION_TIME) * 60 * 60 * 1000;
            response.cookie('jwt', token, {
                maxAge: 48 * 60 * 60 * 1000,
                httpOnly: false,
                secure: true,
            });
            console.log(token);
            return token;
        }
        catch (e) {
            return e.toString();
        }
    }
    login(signUserDto) {
        try {
            const token = this.authService.signIn(signUserDto);
            return token;
        }
        catch (e) {
            return e.toString();
        }
    }
    async activate(link) {
        const user = await this.authService.getUserByLink(link);
        if (user) {
            user.isActivated = true;
        }
        return user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_user_1.SignUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("/activate/:link"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "activate", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("/auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        auth_mail_service_1.AuthMailService,
        auth_token_service_1.AuthTokenService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map