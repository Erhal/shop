import React, {useState} from "react";
import './style.scss';
import {Route, Routes} from "react-router-dom";

import Home from "./screens/Home";
import AllProducts from "./screens/AllProducts";
import Smartphones from "./screens/Smartphones";
import Laptops from "./screens/Laptops";
import ProductPage from "./screens/ProductPage";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/all-products" element={<AllProducts/>}/>
                <Route path="/smartphones" element={<Smartphones/>}/>
                <Route path="/laptops" element={<Laptops/>}/>
                <Route path="/product/:id" element={<ProductPage/>}/>
                <Route path="*" element={<div>404</div>}/>
            </Routes>
            <div>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    style={{marginTop: '60px'}}
                />
            </div>
        </>
    );
}

export default App;