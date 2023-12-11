import React, {FormEvent, useContext, useState} from 'react';
import {Card, Container, Form, FormControl, Button, Row, Col} from "react-bootstrap";
import {UserService} from "../API/user/userService";
import {Context} from "../index";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

const Auth = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const location = useLocation();
    const endPoint = location.pathname;
    const {userStore} = useContext(Context);
    const router = useNavigate();
    let accessToken: string;

    const pushData = async (event: FormEvent) =>{
        event.preventDefault();


        switch(endPoint){
            case "/login":
                accessToken = await UserService.login(formData);
                userStore.setIsAuth(true);
                localStorage.setItem("accessToken", accessToken);
                router("/home")
                break;
            case '/register':
                await UserService.register(formData)
                userStore.setIsAuth(true);
                localStorage.setItem("accessToken", accessToken);
                router("/home")
                break;
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card
                className="p-4"
                style={{width: 400, background:'lightgrey'}}

            >
                {endPoint === '/login' ?
                    <h2 className="m-auto">Authorization</h2>
                    : <h2 className="m-auto">Registration</h2>
                }

                <Form className="d-flex flex-column"  onSubmit={pushData}>
                    {endPoint === '/register' ? <FormControl className="mt-4"
                                                            placeholder="Name..."
                                                            type="text"
                                                            onChange={(event) => setFormData({...formData, name: event.target.value})}
                        />
                        : <></>
                    }
                    <FormControl className="mt-3"
                                 placeholder="Email..."
                                 type="email"
                                 onChange={(event) => setFormData({...formData, email: event.target.value})}
                    />
                    <FormControl className="mt-3"
                                 placeholder="Password..."
                                 type="password"
                                 onChange={(event) => setFormData({...formData, password: event.target.value})}
                    />
                    <Row className="m-0" style={{paddingTop:10}}>
                        <Col>
                            {endPoint === '/login' ? (
                                <div>
                                    <NavLink style={{ color: 'darkcyan' }} to={"/register"}>
                                        Don't have an account?
                                    </NavLink>
                                </div>
                            ) : (

                                <div>
                                    <NavLink style={{ color: 'darkcyan' }} to={"/login"}>
                                        Already registered?
                                    </NavLink>
                                </div>

                            )}
                        </Col>
                        <Col className="d-flex justify-content-end m-lg-auto">
                            <Button type={"submit"}>Submit</Button>
                        </Col>
                    </Row>


                </Form>
            </Card>
        </Container>
    );
};

export default Auth;