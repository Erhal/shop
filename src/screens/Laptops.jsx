import React from 'react';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";

const Laptops = () => {
    return (
        <>
            <Navbar/>
            <Header title={'Laptops'}/>
            <ProductSection numOfProducts={Infinity} category={'laptops'}/>
            <Footer copyright={'Copyright © 2022'}/>
        </>
    );
};

export default Laptops;