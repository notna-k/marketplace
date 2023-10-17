import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
//import { JwtStrategy } from './jwt.strategy';
import {AuthService} from "./auth.service";
import * as process from "process";
import {AuthController} from "./auth.controller";
import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthMailService} from "./auth.mail.service";
import {AuthTokenService} from "./auth.token.service";

const jwtFactory = {
    useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET || 'secret',
        signOptions: {
            expiresIn: process.env.JWT_EXPIRATION_TIME || '24h',
        },
    }),
    inject: [ConfigService],
};

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath : '.env',
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secret',
            signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || "48h" },
        }),


    ],
    providers: [AuthService, AuthMailService, AuthTokenService],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}