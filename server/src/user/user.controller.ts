import {
    Body,
    Controller, forwardRef,
    Get,
    HttpException, HttpStatus, Inject,
    Post, Req,
    Res, UseGuards
} from '@nestjs/common';
import {UserService} from "./user.service";
import {GetProfileBodyDto} from "./dto/get-profile-body.dto";
import {SignInBodyDto} from "./dto/sign-in-body.dto";
import {TokenService} from "../shared/token/token.service";
import {SignUpBodyDto} from "./dto/sign-up-body.dto";
import {ConfigService} from "@nestjs/config";
import {Response} from "express"
import {AuthGuard} from "../shared/guards/auth-guard";
import {RefreshTokenBodyDto} from "./dto/refresh-token-body.dto";
import Cookies from "nodemailer/lib/fetch/cookies";
import {AuthUserDto} from "../shared/dto/auth-user.dto";


@Controller('user')
export class UserController {

    constructor(private readonly usersService : UserService,
                @Inject(forwardRef(() => TokenService)) private readonly tokenService: TokenService,
                private config: ConfigService,
    ) {}



    @Get()
    @UseGuards(AuthGuard)
    async getProfile(@Body() body: AuthUserDto): Promise<any> {

        const {id} = body.user;

        const user = await this.usersService.getUserById(id);
        return user;

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
        console.log(body);

        const user = await this.usersService.createUser(body);
        const {refreshToken, accessToken} = await this.tokenService.createTokens(user)

        await this.usersService.saveRefreshToken(refreshToken, user.id);
        res.cookie('refreshToken', refreshToken, {
            maxAge: Number(this.config.get("JWT_REFRESH_EXPIRES").slice(0, -1)) * 24 * 60 * 60 * 1000,
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
