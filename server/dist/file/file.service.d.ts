/// <reference types="multer" />
export declare enum FileType {
    IMAGE = "image"
}
export declare class FileService {
    private readonly allowedImageExtensions;
    createFile(fileType: FileType, file: Express.Multer.File): Promise<string>;
    private isAllowedExtension;
}
