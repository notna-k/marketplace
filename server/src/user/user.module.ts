import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {JwtModule} from "@nestjs/jwt";
import {Article} from "../articles/articles.model";
import {TokenModule} from "../shared/token/token.module";
import {TokenService} from "../shared/token/token.service";
import {ConfigModule} from "@nestjs/config";

@Module({
  controllers: [UserController],
  providers: [UserService, TokenService],
  exports : [UserService],
  imports : [
      SequelizeModule.forFeature([User, Article]),
      JwtModule,
      ConfigModule,
      ConfigModule.forRoot(),
      forwardRef(() => TokenModule)

  ]
})
export class UserModule {}
