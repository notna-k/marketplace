import {CreateUserDto} from "./dto/create-user";
import axios, {AxiosResponse} from "axios";
import {SignUserDto} from "./dto/sign-user";
import {UpdateUserDto} from "./dto/update-user";

export class UserService{
    static async register(createUserDto: CreateUserDto): Promise<AxiosResponse>{
        const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/api/auth/register", createUserDto);
        return res;
    }

    static async login(signUserDto: SignUserDto): Promise<AxiosResponse>{
        const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/api/auth/login", signUserDto);
        return res;
    }

    static async getProfile(accessToken: string): Promise<AxiosResponse>{
        const res = await axios.get(process.env.REACT_APP_SERVER_URL+"/api/users/profile", {
            headers:{
                Authorization: "Bearer " + accessToken
            }
        })
        return res;
    }

    static async getUser(userId: number): Promise<AxiosResponse>{
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/users/profile/" + userId);
        return res;
    }

    static async update(accessToken: string, updateUserDto: UpdateUserDto): Promise<AxiosResponse>{
        let property: keyof typeof updateUserDto;
        for(property in updateUserDto){
            if(updateUserDto[property] === '') updateUserDto[property] = null;
        }

        const res = await axios.patch(process.env.REACT_APP_SERVER_URL+"/api/users/update", updateUserDto, {
        headers:{
            Authorization: "Bearer " + accessToken,
        }
        })
        return res;
    }
}