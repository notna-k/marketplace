import React, {useContext} from 'react';
import UserProfile from "../components/UserProfile";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";

const Profile = () => {
    const router = useNavigate();
    const {userStore} = useContext(Context);
    if (userStore.getIsAuth()) router('/login');
    return (
        <UserProfile/>
    );
};

export default Profile;