import React from 'react';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";

const Smartphones = ({cartProducts, serCartProducts}) => {
    return (
        <>
            <Navbar/>
            <Header title={'Smartphones'}/>
            <ProductSection numOfProducts={Infinity} category={'smartphones'}/>
            <Footer copyright={'Copyright © 2022'}/>
        </>
    );
};

export default Smartphones;