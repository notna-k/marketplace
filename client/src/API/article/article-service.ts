import axios, {AxiosResponse} from "axios";
import {CreateArticleDto} from "./dto/create-article";

export class ArticleService{
    static async create(accessToken: string, createArticleDto: CreateArticleDto, files: File[]): Promise<AxiosResponse> {
        const res = await axios.post(process.env.REACT_APP_SERVER_URL + '/api/article/create', createArticleDto, {

            headers: {
                Authorization: "Bearer " + accessToken
            }

        })

        return res.data;
    }
    static async getAll(count = 10, offset = 0, title = ""): Promise<AxiosResponse>{
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/article', {params:{
                count,
                offset,
                title
            }});
        return res;
    }
}