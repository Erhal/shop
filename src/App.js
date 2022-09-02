import React from "react";
import '../node_modules/bootstrap/scss/bootstrap.scss';
import './App.scss';
import Navbar from './components/Navbar';
import Header from "./components/Header";

function App() {
    return (
        <>
            <Navbar/>
            <Header title={'Shop in Style'}/>
        </>
    );
}

export default App;
