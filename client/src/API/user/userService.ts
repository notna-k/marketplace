import {CreateUserDto} from "./dto/create-user";
import axios from "axios";
import {SignUserDto} from "./dto/sign-user";
import {UpdateUserDto} from "./dto/update-user";

export class UserService{
    static async register(createUserDto: CreateUserDto): Promise<string>{
        const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/api/auth/register", createUserDto);
        return res.data;
    }

    static async login(signUserDto: SignUserDto): Promise<string>{
        const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/api/auth/login", signUserDto);
        return res.data;
    }

    static async getProfile(accessToken: string){
        const res = await axios.get(process.env.REACT_APP_SERVER_URL+"/api/users/profile", {
            headers:{
                Authorization: "Bearer " + accessToken
            }
        })
        return res.data;
    }

    static async update(accessToken: string, updateUserDto: UpdateUserDto){
        let property: keyof typeof updateUserDto;
        for(property in updateUserDto){
            if(updateUserDto[property] === '') updateUserDto[property] = null;
        }

        const res = await axios.patch(process.env.REACT_APP_SERVER_URL+"/api/users/update", updateUserDto, {
        headers:{
            Authorization: "Bearer " + accessToken,
        }
        })
        return res.data;
    }
}