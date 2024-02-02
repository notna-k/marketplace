import {api} from "../../configs/ky";
import {FetchEndPoint} from "../../constants";
import {ArticleT} from "../../types/api";

export const fetchArticles = async (offset = 0, count = 10): Promise<ArticleT[]> => {
    return api.get(`${FetchEndPoint.ALL_ARTICLES}?count=${count}&offset=${offset}`).json();
}