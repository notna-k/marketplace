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
exports.CreateArticleBodyDto = void 0;
const class_validator_1 = require("class-validator");
const currency_type_1 = require("../../shared/constants/currency-type");
const auth_user_dto_1 = require("../../shared/dto/auth-user.dto");
class CreateArticleBodyDto extends auth_user_dto_1.AuthUserDto {
}
exports.CreateArticleBodyDto = CreateArticleBodyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateArticleBodyDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArticleBodyDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Number)
], CreateArticleBodyDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(currency_type_1.CurrencyType),
    __metadata("design:type", String)
], CreateArticleBodyDto.prototype, "currency", void 0);
//# sourceMappingURL=create-article-body.dto.js.map