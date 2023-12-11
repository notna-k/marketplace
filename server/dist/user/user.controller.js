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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const sign_in_body_dto_1 = require("./dto/sign-in-body.dto");
const token_service_1 = require("../shared/token/token.service");
const sign_up_body_dto_1 = require("./dto/sign-up-body.dto");
const config_1 = require("@nestjs/config");
const auth_guard_1 = require("../shared/guards/auth-guard");
const auth_user_dto_1 = require("../shared/dto/auth-user.dto");
let UserController = class UserController {
    constructor(usersService, tokenService, config) {
        this.usersService = usersService;
        this.tokenService = tokenService;
        this.config = config;
    }
    async getProfile(body) {
        const { id } = body.user;
        const user = await this.usersService.getUserById(id);
        return user;
    }
    async signIn({ email, password }, res) {
        const user = await this.usersService.getUserByEmail(email);
        if (this.usersService.validatePassword(password, user.password)) {
            const { refreshToken, accessToken } = await this.tokenService.createTokens(user);
            return { refreshToken, accessToken };
        }
        else {
            throw new common_1.HttpException("Invalid password", common_1.HttpStatus.FORBIDDEN);
        }
    }
    async signUp(body, res) {
        console.log(body);
        const user = await this.usersService.createUser(body);
        const { refreshToken, accessToken } = await this.tokenService.createTokens(user);
        await this.usersService.saveRefreshToken(refreshToken, user.id);
        res.cookie('refreshToken', refreshToken, {
            maxAge: Number(this.config.get("JWT_REFRESH_EXPIRES").slice(0, -1)) * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        return { refreshToken, accessToken };
    }
    async refreshToken(req) {
        const refreshToken = req.cookies['refreshToken'];
        const response = await this.tokenService.refreshToken(refreshToken);
        return response;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_user_dto_1.AuthUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)("sign_in"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_body_dto_1.SignInBodyDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)("sign_up"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_body_dto_1.SignUpBodyDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)("refresh"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "refreshToken", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => token_service_1.TokenService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        token_service_1.TokenService,
        config_1.ConfigService])
], UserController);
//# sourceMappingURL=user.controller.js.map