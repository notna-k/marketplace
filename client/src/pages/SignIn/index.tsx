import React, { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './styles.css';
import { useSignIn } from '../../hooks/use-sign-in';
import {Routes} from "../../router/routes";
import {useUser} from "../../contexts/UserContext/UserProvider";

const SignIn =  () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const router = useNavigate();
    const {user} = useUser();

    const { mutate, isLoading, isError, isSuccess, } = useSignIn(formData.email, formData.password);

    const pushData = async (event: FormEvent) => {
        event.preventDefault();
        await mutate(formData.email, formData.password);
        console.log(user)
        router(Routes.HOME);
    };

    return (
        <div className="container">
            <div className="card">
                <h2 className="m-auto">Authorization</h2>

                <form className="form" onSubmit={pushData}>
                    <input
                        className="form-control"
                        placeholder="Email..."
                        type="email"
                        onChange={(event) =>
                            setFormData({ ...formData, email: event.target.value })
                        }
                    />
                    <input
                        className="form-control"
                        placeholder="Password..."
                        type="password"
                        onChange={(event) =>
                            setFormData({ ...formData, password: event.target.value })
                        }
                    />
                    <div className="link">
                        <NavLink to="/register">Don't have an account?</NavLink>
                    </div>
                    <button type="submit" className="button">
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                    {isError && <div>Error: Failed to sign in</div>}
                    {isSuccess && <div>Successfully signed in</div>}
                </form>
            </div>
        </div>
    );
};

export default SignIn;
