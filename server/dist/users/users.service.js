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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("./users.model");
const bcrypt = require("bcrypt");
const articles_model_1 = require("../articles/articles.model");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUserById(id) {
        const user = await users_model_1.User.findOne({
            where: { id },
            include: [
                {
                    model: articles_model_1.Article,
                    attributes: ['id']
                },
            ],
        });
        return user;
    }
    async getUserByEmail(email) {
        const user = this.userRepository.findOne({ where: { email: email } });
        return user;
    }
    async createUser({ password, email, name }) {
        const hashedPassword = bcrypt.hashSync(password, 8);
        const user = await this.userRepository.create({ email, name, password: hashedPassword });
        return user;
    }
    async getRefreshToken(userId) {
        const user = await this.userRepository.findByPk(userId);
        return user.refreshToken;
    }
    async saveRefreshToken(refreshToken, userId) {
        const user = await this.userRepository.findByPk(userId);
        user.refreshToken = refreshToken;
        user.save();
        return user;
    }
    async removeRefreshToken(userId) {
        const user = await this.userRepository.findByPk(userId);
        const refreshToken = user.refreshToken;
        user.refreshToken = null;
        await user.save();
        return refreshToken;
    }
    validatePassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map