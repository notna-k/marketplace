import React, {useContext, } from 'react';
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const NavBar = observer( () => {
    const {userStore} = useContext(Context);
    const router = useNavigate();





    return (
        <Navbar bg="dark" variant= "dark">
            <Nav className="me-auto">
                <NavLink to={"/articles"} style={{color: 'lightcyan', fontFamily: 'monospace', fontSize: '24px', marginLeft: '6px'}}>Biopio</NavLink>
            </Nav>
            <Nav className="ms-auto">
                {userStore.getIsAuth() ? (
                    <Nav>
                        <Button variant="outline-light" onClick={() => router('/profile')}>Profile</Button>
                        <Button variant="outline-light" onClick={() => router('/post')} style={{marginLeft: '8px'}}>New article</Button>
                        <Button variant="outline-light" onClick={() => {userStore.setIsAuth(false); router('/login')}}>Logout</Button>

                    </Nav>
                ) : (
                    <Nav>
                        <Button variant="outline-light" onClick={() => router('/login')}>Sign in</Button>
                    </Nav>
                )}
            </Nav>
        </Navbar>
    );
});

export default NavBar;
