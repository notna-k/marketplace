import {api} from "../../configs/ky";
import {FetchEndPoint} from "../../constants";

export const logout = async (): Promise<any> => {
    return api.post(FetchEndPoint.LOG_OUT)
}