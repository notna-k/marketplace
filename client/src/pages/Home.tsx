import React from 'react';
import ArticleList from "../components/ArticleList/index";
import {useUser} from "../contexts/UserContext/UserProvider";


const Home = () => {
    const {user} = useUser();
    console.log(user)
    return (
        <ArticleList/>
    );
};

export default Home;