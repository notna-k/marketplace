import ky from "ky";
import {refreshToken} from "../services/api/refresh-token";
import {SERVER_URL} from "../constants";

export const api = ky.create({
    prefixUrl: SERVER_URL + "api/",
    credentials: 'include',
    hooks: {
        beforeRequest: [
            request =>
                request.headers.set(
                    'Authorization',
                    'Bearer ' + localStorage.getItem('accessToken')
                )
        ],
        afterResponse: [
            async (req, _opts, res) => {
                if (res.status === 401) {
                    try {
                        const token = await refreshToken()

                        req.headers.set('Authorization', `Bearer ${token}`)
                    } catch (e) {
                    }
                }

                return res;
            }
        ]
    }
})