import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
//import { JwtStrategy } from './jwt.strategy';
import {AuthService} from "./auth.service";
import * as process from "process";
import {AuthController} from "./auth.controller";
import {forwardRef, Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthGuard} from "./auth.guard";
import {ACCESS_EXPIRATION_TIME, ACCESS_SECRET} from "../../constants";

const jwtFactory = {
    useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: process.env.JWT_EXPIRATION_TIME,
        },
    }),
    inject: [ConfigService],
};

// @ts-ignore
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath : '.env',
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: ACCESS_SECRET,
            signOptions: { expiresIn: ACCESS_EXPIRATION_TIME},
        }),




    ],
    providers: [AuthService, AuthGuard],
    exports: [AuthService, AuthGuard],
    controllers: [AuthController],
})
export class AuthModule {}