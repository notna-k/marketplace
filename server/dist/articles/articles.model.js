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
exports.Article = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../user/user.model");
const currency_type_1 = require("../shared/constants/currency-type");
let Article = class Article extends sequelize_typescript_1.Model {
};
exports.Article = Article;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Article.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Article.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, defaultValue: "" }),
    __metadata("design:type", String)
], Article.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DOUBLE, allowNull: true }),
    __metadata("design:type", Number)
], Article.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM(...Object.values(currency_type_1.CurrencyType)), allowNull: true }),
    __metadata("design:type", String)
], Article.prototype, "currency", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING), allowNull: true }),
    __metadata("design:type", Array)
], Article.prototype, "images", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Article.prototype, "user", void 0);
exports.Article = Article = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "articles" })
], Article);
//# sourceMappingURL=articles.model.js.map