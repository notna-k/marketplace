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

    async createUser(createUserDto: CreateUserDto): Promise<User>{
        const user = await this.UserRepository.create(createUserDto);
        return user;
    }

    async updateUser(updateUserDto: UpdateUserDto): Promise <User>{
        const {...updateValues} = updateUserDto;


        //searching by id, if not found searching by email
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

        } catch(e){
            await this.UserRepository.update(
                {...updateValues},
                {
                    where: {
                        email: updateValues.email
                    }
                }
            );
            const updatedUser = this.UserRepository.findOne({
                where:{
                    email:updateValues.email
                }
            })
            return updatedUser;

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
