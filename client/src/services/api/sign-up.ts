
import {api} from "../../configs/ky";
import {FetchEndPoint} from "../../constants";
import {UserAuthResponseT} from "../../types/api";

export const signUp = async (email: string, password: string, name: string): Promise<UserAuthResponseT> => {
    return api.post(FetchEndPoint.SIGN_UP, {json: {email, password, name}}).json();
}