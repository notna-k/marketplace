import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {Article} from "./articles.model";

import {FileService} from "../file/file.service";
import {ArticlesController} from "./articles.controller";

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, FileService],
  imports : [
    SequelizeModule.forFeature([Article, User]),
    AuthModule,
    JwtModule,
  ]
})
export class ArticlesModule {}
