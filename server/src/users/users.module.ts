import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {JwtModule} from "@nestjs/jwt";
import {Article} from "../articles/articles.model";
import {TokenModule} from "../token/token.module";
import {TokenService} from "../token/token.service";
import {ConfigModule} from "@nestjs/config";

@Module({
  controllers: [UsersController],
  providers: [UsersService, TokenService],
  exports : [UsersService],
  imports : [
      SequelizeModule.forFeature([User, Article]),
      JwtModule,
      ConfigModule,
      ConfigModule.forRoot(),
      forwardRef(() => TokenModule)

  ]
})
export class UsersModule {}
