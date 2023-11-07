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
let UsersService = class UsersService {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    async getAllUsers() {
        const users = this.UserRepository.findAll();
        return users;
    }
    async getUserById(id) {
        const user = this.UserRepository.findOne({ where: { id: id } });
        return user;
    }
    async getUserByEmail(email) {
        const user = this.UserRepository.findOne({ where: { email: email } });
        return user;
    }
    async createUser(createUserDto) {
        const user = await this.UserRepository.create(createUserDto);
        return user;
    }
    async updateUser(id, updateUserDto) {
        const { ...updateValues } = updateUserDto;
        try {
            await this.UserRepository.update({ ...updateValues }, {
                where: {
                    email: updateValues.id
                }
            });
            const updatedUser = this.UserRepository.findByPk(updateValues.id);
            return updatedUser;
        }
        catch (e) {
            return { Error: e.message };
        }
    }
    async deleteUser(IdOrEmail) {
        let metadata;
        if (typeof (IdOrEmail) == "number") {
            metadata = this.UserRepository.destroy({ where: { id: IdOrEmail } });
        }
        else {
            metadata = this.UserRepository.destroy({ where: { email: IdOrEmail } });
        }
        return metadata;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map