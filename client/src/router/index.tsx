
import {createBrowserRouter} from "react-router-dom";
import React from "react";

import NavBar from "../components/NavBar";
import Home from "../pages/Home";

import Profile from "../pages/Profile";
import ItemDetail from "../components/ItemDetail";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";


export const AppRouter = createBrowserRouter([

    {path: "/", element: <NavBar/>},
    {path: '/sign_in', element: <><NavBar/><SignIn/></>},
    {path: '/sign_up', element: <><NavBar/><SignUp/></>},
    {path: '/home', element: <><NavBar/><Home/></>},
    {path: '/home/:id', element: <><NavBar/><ItemDetail/></>},
    {path: '/profile', element: <><NavBar/><Profile/></>},




]);

