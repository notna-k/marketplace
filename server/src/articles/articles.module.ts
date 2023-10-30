import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {Article} from "./articles.model";
//import {ArticlesController} from "./articles.controller";
import {AuthService} from "../auth/auth.service";

@Module({
  //controllers: [ArticlesController],
  providers: [ArticlesService],
  imports : [
    SequelizeModule.forFeature([Article, User]),
    AuthModule,
    JwtModule

  ]
})
export class ArticlesModule {}
