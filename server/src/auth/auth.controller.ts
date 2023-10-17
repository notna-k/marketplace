import {Body, Controller, Get, Inject, Param, Post, Res} from "@nestjs/common";
import {SignUserDto} from "../users/dto/sign-user";
import {CreateUserDto} from "../users/dto/create-user";
import {AuthService} from "./auth.service";
import {AuthMailService} from "./auth.mail.service";
import {AuthTokenService} from "./auth.token.service";
import {User} from "../users/users.model";
import {UsersService} from "../users/users.service";
import cookieParser from "cookie-parser";
import * as process from "process";
import axios from "axios";
import { Response } from 'express';


@Controller("/auth")
export class AuthController{
    constructor(private authService : AuthService,
                private authMailService: AuthMailService,
                private authTokenService: AuthTokenService) {
    }

    @Post("/register")
    async register(@Body() createUserDto : CreateUserDto,
             @Res({passthrough: true}) response: Response){
        try{
            const token = await this.authService.register(createUserDto);
            const jwtExp = Number(process.env.JWT_EXPIRATION_TIME)*60*60*1000;

            response.cookie('jwt', token, {
                maxAge: 48*60*60*1000,
                httpOnly: false,
                secure: true,
                }
            );
            console.log(token);
            return token;

        }catch (e){
            return e.toString();

        }
    }

    @Post("/login")
    login (@Body() signUserDto: SignUserDto){
        try{
            const token = this.authService.signIn(signUserDto);
            return token;
        } catch(e){
            return e.toString();
        }
    }

    @Get("/activate/:link")
    async activate(@Param() link: string){
        const user: User = await this.authService.getUserByLink(link);
        if(user){
            user.isActivated = true;
        }
        return user;
    }

}