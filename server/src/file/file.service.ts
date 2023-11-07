import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from "fs"
import * as path from "path"
import * as uuid from "uuid"


export enum FileType{
    IMAGE = 'image'
}

@Injectable()
export class FileService {
    async createFile(fileType: FileType, file: Express.Multer.File): Promise<string>{
        try{
            const fileExtension = file.originalname.split('.').pop();
            const fileName = uuid.v4() + "." + fileExtension;

            const filePath = path.resolve(__dirname, '..', '..', 'static', 'image');
            //change with switch/case if enum FileType has more elements

            if(!fs.existsSync(filePath)) fs.mkdirSync(filePath, {recursive: true});
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);

            return fileType + "/" + fileName;
        }catch(e){
            console.log(e);
            //throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
