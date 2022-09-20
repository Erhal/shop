import React from 'react';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";
import Footer from "../components/Footer";

const Smartphones = ({cartProducts, serCartProducts}) => {
    return (
        <>
            <Navbar/>
            <Header title={'Smartphones'}/>
            <ProductsSection numOfProducts={Infinity} category={'smartphones'}/>
            <Footer copyright={'Copyright © 2022'}/>
        </>
    );
};

export default Smartphones;