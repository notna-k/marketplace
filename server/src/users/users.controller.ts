import {
    Body,
    Controller,
    Delete,
    forwardRef,
    Get,
    Headers,
    Inject,
    Injectable,
    Param,
    Patch,
    Post,
    Put, Req, Request, UseGuards
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user";

import {User} from "./users.model";
import {AuthService} from "../auth/auth.service";
import {ExtractJwt} from "passport-jwt";
import {JwtService} from "@nestjs/jwt";
import {UserJwtPayload} from "../auth/interfaces/userJwtPayload";
import {UpdateUserDto} from "./dto/update-user";
import {AuthGuard} from "../auth/auth.guard";


@Controller('/users')
export class UsersController {

    constructor(private readonly usersService : UsersService,


    ) {}

    @Inject(AuthService)
    private readonly authService: AuthService
    @Get("/")
    async getAll(@Headers("Authorization") token: string): Promise<User[]> {
        try {
            await this.authService.adminSignCheck(token);
            const users = await this.usersService.getAllUsers();
            return users;
        }catch (e){
            return e.toString();
        }
    }

    @Get("/id/:id")
    async getById(@Param('id') id : number,
                  @Headers("Authorization") token: string
                  ): Promise<User> {
        try {
            await this.authService.adminSignCheck(token);
            const user = await this.usersService.getUserById(id);
            return user;
        }catch (e){
            return e.toString();
        }

    }


    @Get("/profile")
    @UseGuards(AuthGuard)
    async getProfile(@Request() req,
    ): Promise<User> {
        try {
            const payload = req.payload;

            const id = payload['id'];

            const user = await this.usersService.getUserById(id);
            return user;
        }catch (e){
            return e.toString();
        }

    }

    @Get("/email/:email")
    async getByEmail(@Param('email') email : string,
                     @Headers("Authorization") token: string
                     ): Promise<User> {
        try {
            await this.authService.adminSignCheck(token);
            const user = await this.usersService.getUserByEmail(email);
            return user;
        } catch (e){
            return e.toString();
        }

    }



    @Patch("/update")
    @UseGuards(AuthGuard)
    async updateUser(@Body() updateUserDto : UpdateUserDto,
                     @Headers("Authorization") token: string
    ): Promise<User> {
        try {
            await this.authService.adminSignCheck(token);
            const updatedUser = this.usersService.updateUser(updateUserDto);
            return updatedUser;
        } catch (e){
            return e.toString();
        }

    }

    @Delete("/delete/:id")
    @UseGuards(AuthGuard)
    async deleteUserById(@Param("id") id: number,
                     @Headers("Authorization") token: string){
        try {
            await this.authService.adminSignCheck(token);
            const metadata = this.usersService.deleteUser(id);
            return metadata;
        } catch (e){
            return e.toString();
        }
    }

    @Delete("/delete/:email")
    @UseGuards(AuthGuard)
    async deleteUserByEmail(@Param("email") email: string,
                     @Headers("Authorization") token: string){
        try {
            await this.authService.adminSignCheck(token);
            const metadata = this.usersService.deleteUser(email);
            return metadata;
        } catch (e){
            return e.toString();
            
        }
    }





}
