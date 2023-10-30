import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {SignUserDto} from "../users/dto/sign-user";
import {UsersService} from "../users/users.service";
import {User} from "../users/users.model";
import {UserJwtPayload} from "./interfaces/userJwtPayload";
import {CreateUserDto} from "../users/dto/create-user";
import * as bcrypt from "bcrypt";
import {json} from "express";
import * as process from "process";
import {ACCESS_EXPIRATION_TIME, ACCESS_SECRET, REFRESH_EXPIRATION_TIME, REFRESH_SECRET} from "../../constants";



@Injectable()
export class AuthService {
    private refreshJwtService: JwtService;
    private accessJwtService: JwtService;
    constructor() {
    this.refreshJwtService = new JwtService({
        secret: REFRESH_SECRET,
        signOptions:{expiresIn: REFRESH_EXPIRATION_TIME}
    });

    this.accessJwtService = new JwtService({
        secret: ACCESS_SECRET,
        signOptions:{expiresIn: ACCESS_EXPIRATION_TIME}
    })
    }


    async signIn(signUserDto: SignUserDto): Promise<string> {
        const {email, password} = signUserDto;
        const user = await User.findOne({where: {email: email}})

        if (!user) throw new UnauthorizedException('Incorrect login credentials!');
        const passwordCheck = await this.validatePassword(password, user.id);
        if (!passwordCheck) throw new UnauthorizedException('Incorrect login credentials!');
        const id = user.id;
        const payload: UserJwtPayload = { email, id };
        const accessToken: string = this.accessJwtService.sign(payload);
        user.refreshToken = this.refreshJwtService.sign(payload);
        await user.save();
        return accessToken;

    }

    async register( createUserDto: CreateUserDto): Promise<string> {

        let {name, email, password} = createUserDto;
        password = bcrypt.hashSync(password, 8);
        //const activationLink :string = uuid.v4();

        //await this.authMailService.sendActivationEmail(email, `${process.env.SERVER_URL}/api/auth/activate/${activationLink}`);


        const user = await User.create({name, email, password});
        if (!user) throw new UnauthorizedException('Incorrect registration credentials!');


        const id = user.id;
        const payload: UserJwtPayload = { email, id };
        const accessToken: string = this.accessJwtService.sign(payload);
        user.refreshToken = this.refreshJwtService.sign(payload);
        await user.save();
        return accessToken;

    }

    async validatePassword(password: string, userid: number): Promise<boolean>{
        const user = await User.findByPk(userid);
        return bcrypt.compareSync(password, user.password);
    }

    async signedInCheck(token: string): Promise<object>{

        const payload = this.accessJwtService.verify(token, {secret: process.env.JWT_SECRET});
        const id = payload['id'];
        const userEmail = payload['email'];
        const {email} = await User.findByPk(id);
        if(email == userEmail) {return payload} else throw new BadRequestException("Invalid token provided");

    }

    async adminSignCheck(token: string){
        const payload = this.accessJwtService.verify(token, {secret: ACCESS_SECRET});
        const id = payload['id'];
        const email = payload['email'];

        const user = await User.findByPk(id);
        const sameuser = await User.findOne({where:{email:email}});
        if(user != sameuser) throw new BadRequestException("Invalid user credentials in token")
        if(user.groups.includes("ADMIN")) {return payload} else throw new BadRequestException("Forbidden");

    }

    async refreshAccessToken(refreshToken: string){
        const payload: UserJwtPayload = this.refreshJwtService.verify(refreshToken, {secret: REFRESH_SECRET});
        const id = payload['id'];
        const email = payload['email'];

        const user = await User.findByPk(id);
        const sameuser = await User.findOne({where:{email:email}});
        if(user != sameuser) throw new BadRequestException("Invalid user credentials in token");
        if (user.refreshToken != refreshToken) throw new BadRequestException("Invalid token provided");

        return this.accessJwtService.sign(payload);
    }




}