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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_model_1 = require("../users/users.model");
const bcrypt = require("bcrypt");
const process = require("process");
const auth_mail_service_1 = require("./auth.mail.service");
let AuthService = class AuthService {
    constructor(jwtService, authMailService) {
        this.jwtService = jwtService;
        this.authMailService = authMailService;
    }
    async signIn(signUserDto) {
        const { email, password } = signUserDto;
        const user = await users_model_1.User.findOne({ where: { email: email } });
        if (!user)
            throw new common_1.UnauthorizedException('Incorrect login credentials!');
        const passwordCheck = await this.validatePassword(password, user.id);
        if (!passwordCheck)
            throw new common_1.UnauthorizedException('Incorrect login credentials!');
        const id = user.id;
        const payload = { email, id };
        const token = this.jwtService.sign(payload);
        return { token };
    }
    async register(createUserDto) {
        let { name, email, password, region } = createUserDto;
        password = bcrypt.hashSync(password, 8);
        const user = await users_model_1.User.create({ name, email, password, region });
        if (!user)
            throw new common_1.UnauthorizedException('Incorrect registration credentials!');
        const id = user.id;
        const payload = { email, id };
        const token = this.jwtService.sign(payload);
        return token;
    }
    async validatePassword(password, userid) {
        const user = await users_model_1.User.findByPk(userid);
        return bcrypt.compareSync(password, user.password);
    }
    async signedInCheck(token) {
        const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        const id = payload['id'];
        const userEmail = payload['email'];
        const { email } = await users_model_1.User.findByPk(id);
        if (email == userEmail) {
            return payload;
        }
        else
            throw new Error("Invalid token provided");
    }
    async adminSignCheck(token) {
        const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        const id = payload['id'];
        const email = payload['email'];
        const user = await users_model_1.User.findByPk(id);
        const sameuser = await users_model_1.User.findOne({ where: { email: email } });
        if (user != sameuser)
            throw new Error("Invalid user credentials in token");
        if (user.groups.includes("ADMIN")) {
            return payload;
        }
        else
            throw new Error("Forbidden");
    }
    async getUserByLink(link) {
        return users_model_1.User.findOne({ where: { activationLink: link } });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        auth_mail_service_1.AuthMailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map