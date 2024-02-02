import {useNavigate} from "react-router-dom";
import {useMutation, useQueryClient} from "react-query";
import {logout} from "../services/api/logout";
import {Routes} from "../router/routes";

export const useLogout = () => {
    const navigate = useNavigate()
    const client = useQueryClient()
    const { mutate, error, isError, isLoading, isSuccess } = useMutation<void>({
        mutationFn: () => logout(),
        onSuccess: () => {
            navigate(Routes.SIGN_IN)

            client.clear()
            localStorage.clear()
        },
    })

    return { mutate, error, isError, isLoading, isSuccess }
}