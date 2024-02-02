
import {api} from "../../configs/ky";
import {FetchEndPoint} from "../../constants";
import {UserAuthResponseT} from "../../types/api";

export const signIn = async (email: string, password: string): Promise<UserAuthResponseT> => {
    return api.post(FetchEndPoint.SIGN_IN, {json: {email, password}}).json();
}