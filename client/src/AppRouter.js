
import {createBrowserRouter} from "react-router-dom";
import React from "react";
import Auth from "./pages/Auth"

import NavBar from "./components/NavBar";
import Home from "./pages/Home";

import Profile from "./pages/Profile";


export const AppRouter = createBrowserRouter([

    {path: "/", element: <NavBar/>},
    {path: '/login', element: <><NavBar/><Auth/></>},
    {path: '/register', element: <><NavBar/><Auth/></>},
    {path: '/home', element: <><NavBar/><Home/></>},
    {path: '/profile', element: <><NavBar/><Profile/></>},




]);

