"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = exports.FileType = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
var FileType;
(function (FileType) {
    FileType["IMAGE"] = "image";
})(FileType || (exports.FileType = FileType = {}));
let FileService = class FileService {
    async createFile(fileType, file) {
        try {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = uuid.v4() + "." + fileExtension;
            const filePath = path.resolve(__dirname, '..', '..', 'static', 'image');
            if (!fs.existsSync(filePath))
                fs.mkdirSync(filePath, { recursive: true });
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileType + "/" + fileName;
        }
        catch (e) {
            console.log(e);
        }
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
//# sourceMappingURL=file.service.js.map