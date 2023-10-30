import {Body, Controller, Get, Inject, Param, Post, Res} from "@nestjs/common";
import {SignUserDto} from "../users/dto/sign-user";
import {CreateUserDto} from "../users/dto/create-user";
import {AuthService} from "./auth.service";

import {User} from "../users/users.model";


@Controller("/auth")
export class AuthController{
    constructor(private authService : AuthService) {
    }

    @Post("/register")
    async register(@Body() createUserDto : CreateUserDto){
        try{
            const accessToken = await this.authService.register(createUserDto);
            return accessToken;

        }catch (e){
            return {Error: e.message};

        }
    }

    @Post("/login")
    login (@Body() signUserDto: SignUserDto){
        try{
            const accessToken = this.authService.signIn(signUserDto);
            return accessToken;
        } catch(e){
            return {Error: e.message};
        }
    }



}