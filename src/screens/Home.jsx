import React from 'react';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <Navbar/>
            <Header title={'Shop in Style'}/>
            <ProductsSection numOfProducts={9} category={'all'}/>
            <Footer copyright={'Copyright © 2022'}/>
        </>
    );
};

export default Home;