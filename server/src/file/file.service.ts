import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from "fs"
import * as path from "path"
import * as uuid from "uuid"


export enum FileType{
    IMAGE = 'image'
}

@Injectable()
export class FileService {

    private readonly allowedImageExtensions = ['jpg', 'jpeg', 'png'];
    async createFile(fileType: FileType, file: Express.Multer.File): Promise<string>{
        const fileExtension = file.originalname.split('.').pop();
        if (!this.isAllowedExtension(fileExtension, fileType)) throw new HttpException(
            "Wrong file type provided", HttpStatus.BAD_REQUEST);


        const fileName = uuid.v4() + "." + fileExtension;

        const filePath = path.resolve(__dirname, '..', '..', 'static', fileType);


        if(!fs.existsSync(filePath)) fs.mkdirSync(filePath, {recursive: true});
        fs.writeFileSync(path.join(filePath, fileName), file.buffer);

        return fileName;
    }
    private isAllowedExtension(extension: string, fileType: FileType): boolean {
        switch(fileType){
            case "image":
                return this.allowedImageExtensions.includes(extension);
        }

    }
}
