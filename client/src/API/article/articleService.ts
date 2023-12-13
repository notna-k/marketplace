import axios from "axios";
import {CreateArticleDto} from "./dto/create-article";

export class ArticleService{
    static async create(accessToken: string, createArticleDto: CreateArticleDto, files: File[]) {
        const res = await axios.post(process.env.REACT_APP_SERVER_URL + '/api/article/create', createArticleDto, {

            headers: {
                Authorization: "Bearer " + accessToken
            }

        })

        return res.data;

    }
}