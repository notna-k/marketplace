import React, {ChangeEvent, EventHandler, FormEvent, useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Form, FormControl, FormLabel, Row} from 'react-bootstrap';
import { Context } from '../index';
import { UserService } from '../API/user/userService';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";




const Profile = () => {
    const {userStore} = useContext(Context);
    const accessToken = localStorage.getItem('accessToken');
    const [isChange, setIsChange] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const router = useNavigate();



    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        city: '',
        region: '',
        description: '',

    });

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        city: '',
        region: '',
        profilePhotos: '',
        banned: '',
        banReason: '',
        createdAt: '',
        description: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            if (accessToken) {
                try {
                    const user = await UserService.getProfile(accessToken);
                    if (user) setUserData(user);
                } catch (e) {
                    router('/login');

                }

            }
        }
        fetchData();
    }, [accessToken]);

    const toggleIsChange = (event: FormEvent) =>{
        event.preventDefault();
        setIsChange(!isChange);
    }

    const updateUser = async (event: FormEvent) => {
        event.preventDefault();
        try{
            if(accessToken) await UserService.update(accessToken, formData);
        } catch(e: any){
            setErrMsg(e.message);
        }


    }


    return (
        <Container className=" justify-content-center align-items-center mt-5" >
            <Card className="p-2 shadow" style={{width:'22rem'}}>
                <h3 className="text-center text-muted" style={{fontFamily:"monospace"}}>PROFILE</h3>
            </Card>
            <Card className="p-3 shadow" style={{ width: '22rem' }}>
                <Form>
                    {userData.email && (
                        <div className="mb-3">
                            <Form.Label className="fw-bold">Email address:</Form.Label>
                            {isChange ? (
                                <FormControl
                                    plaintext
                                    readOnly
                                    defaultValue={userData.email}
                                />
                            ) : (
                                <p className="form-control-static">{userData.email == null ? 'Not Defined!' : userData.email}</p>
                            )}
                        </div>
                    )}
                    <div className="mb-3">
                        <Form.Label className="fw-bold">Username:</Form.Label>
                        {isChange ? (
                            <FormControl
                                placeholder="Enter username"
                                value={userData.name}
                                onChange={(e) =>
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        name: e.target.value,
                                    }))
                                }
                            />
                        ) : (
                            <p className="form-control-static">{userData.name == null ? 'Not Defined!' : userData.name}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <Form.Label className="fw-bold">Phone number:</Form.Label>
                        {isChange ? (
                            <FormControl
                                placeholder="Enter phone number"
                                value={userData.phoneNumber}
                                onChange={(e) =>
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        phoneNumber: e.target.value,
                                    }))
                                }
                            />
                        ) : (
                            <p className="form-control-static">{userData.phoneNumber == null ? 'Not Defined!' : userData.phoneNumber}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <Form.Label className="fw-bold">City:</Form.Label>
                        {isChange ? (
                            <FormControl
                                placeholder="Enter city"
                                value={userData.city}
                                onChange={(e) =>
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        city: e.target.value,
                                    }))
                                }
                            />
                        ) : (
                            <p className="form-control-static">{userData.city == null ? 'Not Defined!' : userData.city}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <Form.Label className="fw-bold">Region:</Form.Label>
                        {isChange ? (
                            <FormControl
                                placeholder="Enter region"
                                value={userData.region}
                                onChange={(e) =>
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        region: e.target.value,
                                    }))
                                }
                            />
                        ) : (
                            <p className="form-control-static">{userData.region == null ? 'Not Defined!' : userData.region}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <Form.Label className="fw-bold">Description:</Form.Label>
                        {isChange ? (
                            <FormControl
                                placeholder="Enter description"
                                value={userData.region}
                                onChange={(e) =>
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        description: e.target.value,
                                    }))
                                }
                            />
                        ) : (
                            <p className="form-control-static">{userData.description == null ? 'Not Defined!' : userData.description}</p>
                        )}
                    </div>
                    {userData.createdAt && (
                        <div className="d-flex justify-content-end mt-4">
                            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                                <Form.Label className="fw-bold">User of BIOPIO since:</Form.Label>
                                <p className="form-control-static">{userData.createdAt.split('T')[0] == null ? 'Not Defined!' : userData.createdAt.split('T')[0]}</p>
                            </div>
                        </div>
                    )}
                    <div className="d-flex justify-content-end mt-1">
                        <Row className="d-flex justify-content-end mt-1">
                            <Col>
                                {isChange ? <Button style={{width:'100px'}} variant="success">Change</Button> : <></>}
                            </Col>
                            <Col>
                                <button style={{width:'100px'}} className="btn btn-primary " onClick={toggleIsChange}>
                                    {isChange ? 'Cancel' : 'Edit'}
                                </button>
                            </Col>


                        </Row>

                    </div>
                    <div>
                        <label style={{color:'red'}}>{errMsg}</label>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}

export default Profile;
