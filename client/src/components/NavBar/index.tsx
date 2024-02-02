import React, { FormEvent} from 'react';
import {NavLink,  useNavigate} from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import './styles.css';
import {Routes} from "../../router/routes";
import {useUser} from "../../contexts/UserContext/UserProvider";

const NavBar = observer(() => {
    const router = useNavigate();
    const {setUser, user} = useUser();
    const logout = (event: FormEvent) => {
        event.preventDefault();
        setUser(null);
        router(Routes.SIGN_IN);
    };

    return (
        <nav className="navbar">
            <NavLink to={Routes.HOME} className="brand">
                Biopio
            </NavLink>
            <div className="nav-links">
                {user ? (
                    <>
                        <button className="button" onClick={() => router(Routes.PROFILE)}>
                            Profile
                        </button>
                        <button className="button" onClick={() => router(Routes.CREATE_POST)}>
                            New article
                        </button>
                        <button className="button" onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button className="button" onClick={() => router(Routes.SIGN_IN)}>
                        Sign in
                    </button>
                )}
            </div>
        </nav>
    );
});

export default NavBar;
