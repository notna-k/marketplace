"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.city = user.city;
        this.region = user.region;
        this.phoneNumber = user.phoneNumber;
        this.groups = user.groups;
        this.profilePhoto = user.profilePhoto;
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map