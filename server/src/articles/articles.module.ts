import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {JwtModule} from "@nestjs/jwt";
import {Article} from "./articles.model";

import {FileService} from "../file/file.service";
import {ArticlesController} from "./articles.controller";
import {TokenModule} from "../token/token.module";

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, FileService],
  imports : [
    SequelizeModule.forFeature([Article, User]),
    JwtModule,
      TokenModule
  ]
})
export class ArticlesModule {}
