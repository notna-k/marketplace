import {Module} from "@nestjs/common"

import { SequelizeModule } from "@nestjs/sequelize";
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./user/user.model";
import * as process from "process";
import { ArticlesModule } from './articles/articles.module';
import {Article} from "./articles/articles.model";
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";



@Module({
    controllers: [],
    providers: [FileService],
    imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, '..', "static")}),
        ConfigModule.forRoot({
        envFilePath : '.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Article],
            autoLoadModels : true
        }),

        UserModule,
        ArticlesModule,
        FileModule
    ],
 })
export class AppModule{

}