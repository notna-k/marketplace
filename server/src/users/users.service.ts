import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import * as bcrypt from "bcrypt"
import {SignUpBodyDto} from "./dto/sign-up-body.dto";
import {Article} from "../articles/articles.model";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {
    }


    async getUserById(id: number): Promise<User>{
        const user = await User.findOne({
            where: { id },
            include: [
                {
                    model: Article,
                    attributes: ['id']
                },
            ],
        });
        return user;
    }
    async getUserByEmail(email: string): Promise<User>{
        const user = this.userRepository.findOne({where: {email: email}})
        return user;
    }

    async createUser({password, email, name}: SignUpBodyDto): Promise<User>{
        const hashedPassword = bcrypt.hashSync(password, 8);

        const user = await this.userRepository.create({email, name, password: hashedPassword});
        return user;
    }



    async getRefreshToken(userId: number): Promise<string>{
        const user = await this.userRepository.findByPk(userId);
        return user.refreshToken;
    }

    async saveRefreshToken(refreshToken: string, userId: number): Promise<User>{
        const user = await this.userRepository.findByPk(userId);
        user.refreshToken = refreshToken;
        user.save();
        return user;
    }

    async removeRefreshToken(userId: number): Promise<string>{
        const user: User = await this.userRepository.findByPk(userId);
        const refreshToken = user.refreshToken;
        user.refreshToken = null;
        await user.save();
        return refreshToken;
    }

    validatePassword(password: string, hashedPassword: string): boolean{
        return bcrypt.compareSync(password, hashedPassword);
    }


}
