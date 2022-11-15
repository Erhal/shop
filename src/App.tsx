import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./screens/Home";

import routes from "./routes";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import './style.scss';

const App:FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                {routes.map(({path, Screen}) => <Route key={path} path={path} element={<Screen/>}/>)}
            </Route>
        </Routes>
    );
}

export default App;