import React, { useState} from "react";
import './style.scss';
import {Route, Routes} from "react-router-dom";

import Home from "./screens/Home";
import AllProducts from "./screens/AllProducts";
import Smartphones from "./screens/Smartphones";
import Laptops from "./screens/Laptops";
import ProductPage from "./screens/ProductPage";

function App() {
    const [cartProducts, setCartProducts] = useState(0);

    return (
        <Routes>
            <Route path="/" element={<Home {...{cartProducts, setCartProducts}}/>}/>
            <Route path="/all-products" element={<AllProducts {...{cartProducts, setCartProducts}}/>}/>
            <Route path="/smartphones" element={<Smartphones {...{cartProducts, setCartProducts}}/>}/>
            <Route path="/laptops" element={<Laptops {...{cartProducts, setCartProducts}}/>}/>
            <Route path="/product/:id" element={<ProductPage {...{cartProducts, setCartProducts}}/>}/>
            <Route path="*" element={<div>404</div>}/>
        </Routes>
    );
}

export default App;
