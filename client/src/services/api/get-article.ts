import {api} from "../../configs/ky";
import {FetchEndPoint} from "../../constants";
import {ArticleT} from "../../types/api";

export const fetchArticles = async (id: number): Promise<ArticleT[]> => {
    return api.get(`${FetchEndPoint.ARTICLE}/${id}`).json();
}