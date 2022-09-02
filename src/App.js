import React from "react";
import '../node_modules/bootstrap/scss/bootstrap.scss';
import './App.scss';
import Navbar from './components/Navbar';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductSection from "./components/ProductSection";

function App() {
    return (
        <>
            <Navbar/>
            <Header title={'Shop in Style'}/>
            <ProductSection/>
            <Footer copyright={'Copyright © 2022'}/>
        </>
    );
}

export default App;
