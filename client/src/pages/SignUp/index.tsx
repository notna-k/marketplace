import React, { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './styles.css';
import { useUser } from '../../contexts/UserContext/UserProvider';
import {Routes} from "../../router/routes";
import {useSignUp} from "../../hooks/use-sign-up";

const SignUp =  () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const router = useNavigate();
    const { setUser } = useUser();

    const { mutate, isLoading, isError, isSuccess } = useSignUp(formData.email, formData.password, formData.name);

    const pushData = async (event: FormEvent) => {
        event.preventDefault();
        const response = await mutate(formData.email, formData.password);
        setUser(response.user);
        router(Routes.HOME);
    };

    return (
        <div className="container">
            <div className="card">
                <h2 className="m-auto">Registration</h2>

                <form className="form" onSubmit={pushData}>
                    <input
                        className="form-control"
                        placeholder="Name..."
                        type="text"
                        onChange={(event) =>
                            setFormData({ ...formData, name: event.target.value })
                        }
                    />
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
                        <NavLink to={`${Routes.SIGN_IN}`}>Already registered?</NavLink>
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

export default SignUp;
