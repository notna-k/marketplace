import React, {useContext} from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import About from "../pages/About";
import Register from "../pages/Registration";
import Profile from "../pages/Profile";
import Navbar from "../components/UI/Navbar/Navbar";
import Posts from "../pages/Posts";



export const AppRouter = createBrowserRouter([
    /*{path: "/", element: <Navbar/>},
    {path: "/register", element: <><Navbar/><Register/></>},
    {path: "/login", element: <><Navbar/><Login/></>},
    {path: "/profile", element: <><Navbar/><Profile/></>},
    {path: "/about", element: <><Navbar/><About/></>}*/

    {path: "/", element: <Navbar/>, children:[
            {path: "/posts", element: <Posts/>},
            {path: "/register", element: <Register/>},
            {path: "/login", element: <Login/>},
            {path: "/profile", element: <Profile/>},
            {path: "/about", element: <About/>}
        ]}


]);

