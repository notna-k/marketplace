import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {AuthService} from "../auth/auth.service";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {ArticlesModule} from "../articles/articles.module";
import {Article} from "../articles/articles.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports : [UsersModule],
  imports : [
      SequelizeModule.forFeature([User, Article]),
      AuthModule,
      JwtModule,

  ]
})
export class UsersModule {}
