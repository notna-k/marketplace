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
exports.AuthMailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const process = require("process");
let AuthMailService = class AuthMailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    }
    async sendActivationEmail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMPT_USER,
            to,
            subject: "Activation of account on" + process.env.SERVER_URL,
            html: `
                <div>
                    <a href="${link}">Click the reference to activate the account</a>
                </div>
            `
        });
    }
};
exports.AuthMailService = AuthMailService;
exports.AuthMailService = AuthMailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AuthMailService);
//# sourceMappingURL=auth.mail.service.js.map