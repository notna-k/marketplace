import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {SignUserDto} from "../users/dto/sign-user";
import {UsersService} from "../users/users.service";
import {User} from "../users/users.model";
import {UserJwtPayload} from "./interfaces/userJwtPayload";
import {CreateUserDto} from "../users/dto/create-user";
import * as bcrypt from "bcrypt";
import {json} from "express";
import * as process from "process";
import {InjectModel} from "@nestjs/sequelize";
import {AuthMailService} from "./auth.mail.service";
import * as uuid from 'uuid'


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
                private authMailService: AuthMailService) {
    }


    async signIn(signUserDto: SignUserDto): Promise<{ token: string }> {
        const {email, password} = signUserDto;
        const user = await User.findOne({where: {email: email}})

        if (!user) throw new UnauthorizedException('Incorrect login credentials!');
        const passwordCheck = await this.validatePassword(password, user.id);
        if (!passwordCheck) throw new UnauthorizedException('Incorrect login credentials!');
        const id = user.id;
        const payload: UserJwtPayload = { email, id };
        const token: string = this.jwtService.sign(payload);
        return { token };

    }

    async register( createUserDto: CreateUserDto): Promise<string> {

        let {name, email, password, region} = createUserDto;
        password = bcrypt.hashSync(password, 8);
        //const activationLink :string = uuid.v4();

        //await this.authMailService.sendActivationEmail(email, `${process.env.SERVER_URL}/api/auth/activate/${activationLink}`);


        const user = await User.create({name, email, password, region});
        if (!user) throw new UnauthorizedException('Incorrect registration credentials!');


        const id = user.id;
        const payload: UserJwtPayload = { email, id };
        const token: string = this.jwtService.sign(payload);
        return token ;

    }

    async validatePassword(password: string, userid: number): Promise<boolean>{
        const user = await User.findByPk(userid);
        return bcrypt.compareSync(password, user.password);
    }

    async signedInCheck(token: string): Promise<object>{

        const payload = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});
        const id = payload['id'];
        const userEmail = payload['email'];
        const {email} = await User.findByPk(id);
        if(email == userEmail) {return payload} else throw new Error("Invalid token provided");

    }

    async adminSignCheck(token: string){
        const payload = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});
        const id = payload['id'];
        const email = payload['email'];

        const user = await User.findByPk(id);
        const sameuser = await User.findOne({where:{email:email}});
        if(user != sameuser) throw new Error("Invalid user credentials in token")
        if(user.groups.includes("ADMIN")) {return payload} else throw new Error("Forbidden");

    }

    async getUserByLink(link: string):Promise<User>{
        return User.findOne({where:{activationLink: link}});
    }



}