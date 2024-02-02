import {forwardRef, Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {TokenService} from "./token.service";
import {UsersModule} from "../users/users.module";
import {User} from "../users/users.model";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UsersService} from "../users/users.service";

@Module({
    controllers: [],
    providers: [TokenService, ConfigService],
    exports : [TokenService],
    imports : [
        ConfigModule.forRoot(),
        JwtModule,
        forwardRef(() => UsersModule),
        ConfigModule
    ]
})
export class TokenModule {}