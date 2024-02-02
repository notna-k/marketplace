import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import {AppRouter} from "./router";

function App() {
  return (
    <RouterProvider router={AppRouter}/>
  );
}

export default App;
