import {useMutation} from "react-query";
import {signIn} from "../services/api/sign-in";
import {UserAuthResponseT} from "../types/api";
import {useUser} from "../contexts/UserContext/UserProvider";

export const useSignIn = (email: string, password: string): any =>{
    const {setUser} = useUser();
    const { mutate, error, isError, isLoading, isSuccess, data } = useMutation<UserAuthResponseT>({
        mutationFn: async (): Promise<UserAuthResponseT> =>{
            const signInResult = await signIn(email, password);
            setUser(signInResult.user);
            localStorage.setItem('accessToken', signInResult?.accessToken || '');

            return signInResult;
        },
        onSuccess: (): any => {



        },
    })

    return { mutate, error, isError, isLoading, isSuccess, data}
}