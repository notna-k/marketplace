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
const auth_service_1 = require("../auth/auth.service");
const update_user_1 = require("./dto/update-user");
const auth_guard_1 = require("../auth/auth.guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getAll(token) {
        try {
            await this.authService.adminSignCheck(token);
            const users = await this.usersService.getAllUsers();
            return users;
        }
        catch (e) {
            return e.toString();
        }
    }
    async getById(id, token) {
        try {
            await this.authService.adminSignCheck(token);
            const user = await this.usersService.getUserById(id);
            return user;
        }
        catch (e) {
            return e.toString();
        }
    }
    async getProfile(req) {
        try {
            const payload = req.payload;
            const id = payload['id'];
            const user = await this.usersService.getUserById(id);
            const { name, email, phoneNumber, city, region, profilePhotos, banned, banReason, createdAt } = user;
            return { name, email, phoneNumber, city, region, profilePhotos, banned, banReason, createdAt };
        }
        catch (e) {
            return { Error: e.message };
        }
    }
    async getByEmail(email, token) {
        try {
            await this.authService.adminSignCheck(token);
            const user = await this.usersService.getUserByEmail(email);
            return user;
        }
        catch (e) {
            return { Error: e.message };
        }
    }
    async updateUser(updateUserDto, token, res) {
        try {
            await this.authService.adminSignCheck(token);
            const updatedUser = await this.usersService.updateUser(res.payload['id'], updateUserDto);
            return updatedUser;
        }
        catch (e) {
            return e.toString();
        }
    }
    async deleteUserById(id, token) {
        try {
            await this.authService.adminSignCheck(token);
            const metadata = this.usersService.deleteUser(id);
            return metadata;
        }
        catch (e) {
            return e.toString();
        }
    }
    async deleteUserByEmail(email, token) {
        try {
            await this.authService.adminSignCheck(token);
            const metadata = this.usersService.deleteUser(email);
            return metadata;
        }
        catch (e) {
            return e.toString();
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Inject)(auth_service_1.AuthService),
    __metadata("design:type", auth_service_1.AuthService)
], UsersController.prototype, "authService", void 0);
__decorate([
    (0, common_1.Get)("/"),
    __param(0, (0, common_1.Headers)("Authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("/id/:id"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)("Authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)("/profile"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)("/email/:email"),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Headers)("Authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getByEmail", null);
__decorate([
    (0, common_1.Patch)("/update"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)("Authorization")),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_1.UpdateUserDto, String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)("/delete/:id"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("Authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserById", null);
__decorate([
    (0, common_1.Delete)("/delete/:email"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)("email")),
    __param(1, (0, common_1.Headers)("Authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserByEmail", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map