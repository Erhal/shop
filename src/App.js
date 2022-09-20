import React from "react";
import './style.scss';
import {Route, Routes} from "react-router-dom";

import Home from "./screens/Home";
import AllProducts from "./screens/AllProducts";
import Smartphones from "./screens/Smartphones";
import Laptops from "./screens/Laptops";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/all-products" element={<AllProducts/>}/>
            <Route path="/smartphones" element={<Smartphones/>}/>
            <Route path="/laptops" element={<Laptops/>}/>
            <Route path="*" element={<div>404</div>}/>
        </Routes>
    );
}

export default App;
