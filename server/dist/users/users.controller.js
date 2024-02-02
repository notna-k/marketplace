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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const sign_in_body_dto_1 = require("./dto/sign-in-body.dto");
const token_service_1 = require("../token/token.service");
const sign_up_body_dto_1 = require("./dto/sign-up-body.dto");
const config_1 = require("@nestjs/config");
const get_profile_param_dto_1 = require("./dto/get-profile-param-dto");
const user_dto_1 = require("../shared/dto/user.dto");
let UsersController = class UsersController {
    constructor(usersService, tokenService, config) {
        this.usersService = usersService;
        this.tokenService = tokenService;
        this.config = config;
    }
    async getProfile({ id }) {
        const foundUser = await this.usersService.getUserById(id);
        return foundUser;
    }
    async getUserArticles(id) {
        const foundUser = await this.usersService.getUserById(id);
        if (!foundUser)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        const { name, city, region, email, profilePhoto, articles } = foundUser;
        return { name, city, region, email, profilePhoto, articles: articles };
    }
    async signIn({ email, password }, res) {
        const user = await this.usersService.getUserByEmail(email);
        if (!user) {
            throw new common_1.HttpException("User doesn't exist", common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!this.usersService.validatePassword(password, user.password)) {
            throw new common_1.HttpException("Invalid password", common_1.HttpStatus.FORBIDDEN);
        }
        const { refreshToken, accessToken } = await this.tokenService.createTokens(user);
        res.cookie('refreshToken', refreshToken, {
            maxAge: Number(this.config.get("JWT_REFRESH_EXPIRES").slice(0, -1)) * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        const mappedUser = new user_dto_1.UserDto(user);
        return { refreshToken, accessToken, user: mappedUser };
    }
    async signUp(body, res) {
        const existUser = await this.usersService.getUserByEmail(body.email);
        if (existUser)
            throw new common_1.HttpException("User with given email already exists", common_1.HttpStatus.BAD_REQUEST);
        const user = await this.usersService.createUser(body);
        const { refreshToken, accessToken } = await this.tokenService.createTokens(user);
        await this.usersService.saveRefreshToken(refreshToken, user.id);
        res.cookie('refreshToken', refreshToken, {
            maxAge: Number(this.config.get("JWT_REFRESH_EXPIRES").slice(0, -1)) * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: false,
        });
        const mappedUser = new user_dto_1.UserDto(user);
        return { refreshToken, accessToken, user: mappedUser };
    }
    async refreshToken(req) {
        const refreshToken = req.cookies['refreshToken'];
        const response = await this.tokenService.refreshToken(refreshToken);
        return response;
    }
    async logout(req, res) {
        const { refreshToken } = req.cookies;
        console.log(req.cookies);
        const token = await this.tokenService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return token;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)("profile/:id"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_profile_param_dto_1.GetProfileParamDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)("articles"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserArticles", null);
__decorate([
    (0, common_1.Post)("sign_in"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_body_dto_1.SignInBodyDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)("sign_up"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_body_dto_1.SignUpBodyDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)("refresh"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)("logout"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('user'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => token_service_1.TokenService))),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        token_service_1.TokenService,
        config_1.ConfigService])
], UsersController);
//# sourceMappingURL=users.controller.js.map