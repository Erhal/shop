import React from 'react';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";

const AllProducts = () => {
    return (
        <>
            <Navbar/>
            <Header title={'All Products'}/>
            <ProductSection numOfProducts={Infinity} category={'all'}/>
            <Footer copyright={'Copyright © 2022'}/>
        </>
    );
};

export default AllProducts;