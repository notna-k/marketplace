import {
    Body,
    Controller, forwardRef,
    Get,
    HttpException, HttpStatus, Inject, Param,
    Post, Req,
    Res, UseGuards
} from '@nestjs/common';
import {UserService} from "./user.service";
import {SignInBodyDto} from "./dto/sign-in-body.dto";
import {TokenService} from "../token/token.service";
import {SignUpBodyDto} from "./dto/sign-up-body.dto";
import {ConfigService} from "@nestjs/config";
import {Response} from "express"
import {AuthGuard} from "../shared/guards/auth-guard";

import {UserJwtPayload} from "../shared/dto/auth-user.dto";
import {User} from "../shared/decorators/user.decorator";


@Controller('user')
export class UserController {

    constructor(private readonly usersService : UserService,
                @Inject(forwardRef(() => TokenService)) private readonly tokenService: TokenService,
                private config: ConfigService,
    ) {}



    @Get()
    @UseGuards(AuthGuard)
    async getProfile(@User() user: UserJwtPayload): Promise<any> {

        const {id} = user;

        const foundUser = await this.usersService.getUserById(id);
        return foundUser;

    }

    @Get(":id")
    async getUserArticles(@Param("id") id: number): Promise<any>{

        const foundUser = await this.usersService.getUserById(id);
        if (!foundUser) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

        const {name, city, region, email, profilePhoto, articles} = foundUser;
        return {name, city, region, email, profilePhoto, articles: articles};
    }

    @Post("sign_in")
    async signIn(@Body() {email, password}: SignInBodyDto,
                 @Res({ passthrough: true }) res: Response): Promise<any>{

        const user = await this.usersService.getUserByEmail(email);
        if(this.usersService.validatePassword(password, user.password)){
            const {refreshToken, accessToken} = await this.tokenService.createTokens(user)
            return {refreshToken, accessToken};
        } else{
            throw new HttpException("Invalid password", HttpStatus.FORBIDDEN);
        }
    }

    @Post("sign_up")
    async signUp(@Body() body: SignUpBodyDto,
                 @Res({ passthrough: true }) res: Response): Promise<any>{

        const existUser = await this.usersService.getUserByEmail(body.email);
        if(existUser) throw new HttpException("User with given email already exists",
            HttpStatus.BAD_REQUEST);


        const user = await this.usersService.createUser(body);
        const {refreshToken, accessToken} = await this.tokenService.createTokens(user);

        await this.usersService.saveRefreshToken(refreshToken, user.id);
        res.cookie('refreshToken', refreshToken, {
            maxAge: Number(this.config.get("JWT_REFRESH_EXPIRES").slice(0,-1)) * 24*60*60*1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        return {refreshToken, accessToken};
    }

    @Post("refresh")
    async refreshToken(@Req() req): Promise<any>{
        const refreshToken: string = req.cookies['refreshToken'];
        const response = await this.tokenService.refreshToken(refreshToken);
        return response;

    }










}
