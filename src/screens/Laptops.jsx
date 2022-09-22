import React from 'react';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";
import Footer from "../components/Footer";

const Laptops = () => {
    return (
        <>
            <Navbar/>
            <Header title={'Laptops'}/>
            <ProductsSection numOfProducts={Infinity} category={'laptops'}/>
            <Footer copyright={'Copyright © 2022'}/>
        </>
    );
};

export default Laptops;