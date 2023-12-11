import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import {AppRouter} from "./AppRouter";

function App() {
  return (
    <RouterProvider router={AppRouter}/>
  );
}

export default App;
