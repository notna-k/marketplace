import {useNavigate} from "react-router-dom";
import {useMutation} from "react-query";
import {Routes} from "../router/routes";
import {signUp} from "../services/api/sign-up";

export const useSignUp = (email: string, password: string, name: string): any =>{
    const navigate = useNavigate()
    const { mutate, error, isError, isLoading, isSuccess } = useMutation<void>({
        mutationFn: async () =>{
            const signInResponse = await signUp(email, password, name);
            localStorage.setItem('accessToken', signInResponse.accessToken)

        },
        onSuccess: () => {
            navigate(Routes.HOME)

        },
    })

    return { mutate, error, isError, isLoading, isSuccess }
}