import ky from "ky";
import {FetchEndPoint, SERVER_URL} from "../../constants";
import {RefreshTokenResponseT} from "../../types/api";

export const refreshToken = async (): Promise<RefreshTokenResponseT> => {
    return ky
        .get(`${SERVER_URL}${FetchEndPoint.REFRESH_TOKEN}`, { credentials: 'include' })
        .json()
}
