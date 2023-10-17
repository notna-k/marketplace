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
    Put
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user";

import {User} from "./users.model";
import {AuthService} from "../auth/auth.service";
import {ExtractJwt} from "passport-jwt";
import {JwtService} from "@nestjs/jwt";
import {UserJwtPayload} from "../auth/interfaces/userJwtPayload";
import {UpdateUserDto} from "./dto/update-user";


@Controller('/users')
export class UsersController {

    constructor(private readonly usersService : UsersService,


    ) {}

    @Inject(AuthService)
    private readonly authService: AuthService
    @Get("/")
    async getAll(@Headers("jwt") token: string): Promise<User[]> {
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
                  @Headers("jwt") token: string
                  ): Promise<User> {
        try {
            await this.authService.adminSignCheck(token);
            const user = await this.usersService.getUserById(id);
            return user;
        }catch (e){
            return e.toString();
        }

    }

    @Get("/me")
    async getMe(@Headers("jwt") token: string,
    ): Promise<User> {
        try {
            const payload = await this.authService.signedInCheck(token);

            const id = payload['id'];

            const user = await this.usersService.getUserById(id);
            return user;
        }catch (e){
            return e.toString();
        }

    }

    @Get("/email/:email")
    async getByEmail(@Param('email') email : string,
                     @Headers("jwt") token: string
                     ): Promise<User> {
        try {
            await this.authService.adminSignCheck(token);
            const user = await this.usersService.getUserByEmail(email);
            return user;
        } catch (e){
            return e.toString();
        }

    }

    @Post("/create")
    async createUser(@Body() createUserDto : CreateUserDto,
                     @Headers("jwt") token: string
    ): Promise<User> {
        try {
            await this.authService.adminSignCheck(token);
            const user = this.usersService.createUser(createUserDto);
            return user;
        } catch (e){
            return e.toString();
        }

    }

    @Patch("/update")
    async updateUser(@Body() updateUserDto : UpdateUserDto,
                     @Headers("jwt") token: string
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
    async deleteUserById(@Param("id") id: number,
                     @Headers("jwt") token: string){
        try {
            await this.authService.adminSignCheck(token);
            const metadata = this.usersService.deleteUser(id);
            return metadata;
        } catch (e){
            return e.toString();
        }
    }

    @Delete("/delete/:email")
    async deleteUserByEmail(@Param("email") email: string,
                     @Headers("jwt") token: string){
        try {
            await this.authService.adminSignCheck(token);
            const metadata = this.usersService.deleteUser(email);
            return metadata;
        } catch (e){
            return e.toString();
            
        }
    }





}
