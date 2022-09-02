import React from "react";
import '../node_modules/bootstrap/scss/bootstrap.scss';
import './App.scss';
import Navbar from './components/Navbar';
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <>
            <Navbar/>
            <Header title={'Shop in Style'}/>
            <div style={{minHeight: '37vh'}}></div>
            <Footer copyright={'Copyright © 2022'}/>
        </>
    );
}

export default App;
