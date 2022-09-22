import React from 'react';
import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";

const Laptops = () => {
    return (
        <>
            <Header title={'Laptops'}/>
            <ProductsSection numOfProducts={Infinity} category={'laptops'}/>
        </>
    );
};

export default Laptops;