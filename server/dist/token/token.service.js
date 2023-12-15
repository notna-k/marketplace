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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
let TokenService = class TokenService {
    constructor(jwtService, config, userService) {
        this.jwtService = jwtService;
        this.config = config;
        this.userService = userService;
    }
    async createTokens(user) {
        const payload = {
            id: user.id,
            email: user.email,
            isActivated: user.isActivated
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.config.get("JWT_ACCESS_SECRET"), expiresIn: this.config.get("JWT_ACCESS_EXPIRES")
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.config.get("JWT_REFRESH_SECRET"), expiresIn: this.config.get("JWT_REFRESH_EXPIRES")
        });
        return { accessToken, refreshToken };
    }
    validateAccessToken(accessToken) {
        const payload = this.jwtService.verify(accessToken, { secret: this.config.get("JWT_ACCESS_SECRET") });
        return payload;
    }
    validateRefreshToken(refreshToken) {
        const payload = this.jwtService.verify(refreshToken, { secret: this.config.get("JWT_REFRESH_SECRET") });
        return payload;
    }
    async removeRefreshToken(refreshToken) {
        const payload = await this.validateRefreshToken(refreshToken);
        const { id } = payload;
        const dbRefreshToken = await this.userService.getRefreshToken(id);
        const dbPayload = await this.validateRefreshToken(dbRefreshToken);
        if (dbPayload && (refreshToken === dbRefreshToken)) {
            const refreshToken = this.userService.removeRefreshToken(id);
            return refreshToken;
        }
    }
    async refreshToken(refreshToken) {
        const payload = this.validateRefreshToken(refreshToken);
        const { id, email, isActivated } = payload;
        const dbRefreshToken = await this.userService.getRefreshToken(id);
        const dbPayload = this.validateRefreshToken(dbRefreshToken);
        if (dbPayload && (refreshToken === dbRefreshToken)) {
            const accessToken = this.jwtService.sign({ id, email, isActivated }, {
                secret: this.config.get("JWT_ACCESS_SECRET"), expiresIn: this.config.get("JWT_ACCESS_EXPIRES")
            });
            return { accessToken };
        }
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        user_service_1.UserService])
], TokenService);
//# sourceMappingURL=token.service.js.map