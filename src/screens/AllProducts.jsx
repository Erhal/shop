import React from 'react';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";
import Footer from "../components/Footer";

const AllProducts = () => {
    return (
        <>
            <Navbar/>
            <Header title={'All Products'}/>
            <ProductsSection numOfProducts={Infinity} category={'all'}/>
            <Footer copyright={'Copyright © 2022'}/>
        </>
    );
};

export default AllProducts;