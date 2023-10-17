import {Module} from "@nestjs/common"

import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import * as process from "process";
import {JwtModule} from "@nestjs/jwt";
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';
import {Article} from "./articles/articles.model";



@Module({
    controllers: [],
    providers: [],
    imports: [
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
        UsersModule,
        JwtModule.register({ secret: process.env.JWT_ACCESS_SECRET }),
        AuthModule,
        ArticlesModule
    ],
 })
export class AppModule{

}