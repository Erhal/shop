import React from 'react';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";

const Home = ({cartProducts, serCartProducts}) => {
    return (
        <>
            <Navbar/>
            <Header title={'Shop in Style'}/>
            <ProductSection numOfProducts={9} category={'all'}/>
            <Footer copyright={'Copyright © 2022'}/>
        </>
    );
};

export default Home;