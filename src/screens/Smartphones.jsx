import React from 'react';
import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";

const Smartphones = () => {
    return (
        <>
            <Header title={'Smartphones'}/>
            <ProductsSection numOfProducts={Infinity} category={'smartphones'}/>
        </>
    );
};

export default Smartphones;