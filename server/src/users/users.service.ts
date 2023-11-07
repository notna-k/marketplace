import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user";

import {UpdateUserDto} from "./dto/update-user";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private UserRepository: typeof User) {
    }

    async getAllUsers(): Promise<User[]>{
        const users = this.UserRepository.findAll();
        return users;
    }

    async getUserById(id: number): Promise<User>{
        const user = this.UserRepository.findOne({where: {id: id}})
        return user;
    }
    async getUserByEmail(email: string): Promise<User>{
        const user = this.UserRepository.findOne({where: {email: email}})
        return user;
    }

    async createUser(createUserDto: CreateUserDto){
        const user = await this.UserRepository.create(createUserDto);
        return user;
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto){
        const {...updateValues} = updateUserDto;


        try {
            await this.UserRepository.update(
                {...updateValues},
                {
                    where: {
                        email: updateValues.id
                    }
                }
            );
            const updatedUser = this.UserRepository.findByPk(updateValues.id)
            return updatedUser;

        } catch(e: any){
            return {Error: e.message}

        }



    }

    async deleteUser(IdOrEmail: number | string){
        let metadata;
        if (typeof (IdOrEmail) == "number") {
            metadata = this.UserRepository.destroy({where: {id: IdOrEmail}});
        } else{
            metadata = this.UserRepository.destroy({where: {email: IdOrEmail}});
        }
        return metadata;
    }

}
