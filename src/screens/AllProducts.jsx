import React from 'react';
import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";

const AllProducts = () => {
    return (
        <>
            <Header title={'All Products'}/>
            <ProductsSection numOfProducts={Infinity} category={'all'}/>
        </>
    );
};

export default AllProducts;