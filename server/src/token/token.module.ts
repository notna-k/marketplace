import {forwardRef, Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {TokenService} from "./token.service";
import {UserModule} from "../user/user.module";
import {User} from "../user/user.model";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserService} from "../user/user.service";

@Module({
    controllers: [],
    providers: [TokenService, ConfigService],
    exports : [TokenService],
    imports : [
        ConfigModule.forRoot(),
        JwtModule,
        forwardRef(() => UserModule),
        ConfigModule
    ]
})
export class TokenModule {}