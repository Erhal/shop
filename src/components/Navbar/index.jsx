import React from 'react';
import './style.css'
import CartBox from "../CartBox";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <>
            {/*  PUSH NOTIFICATIONS  */}
            <div className="toast-container position-fixed"></div>

            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div className="container px-4 px-lg-5"><span className="navbar-brand">Shop</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li className="nav-item"><Link to={'/'} className="nav-link active">Home</Link></li>
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">Shop</div>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to={'/all-products'} className="dropdown-item" >All Products</Link></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><Link to={'/smartphones'} className="dropdown-item">Smartphones</Link></li>
                                    <li><Link to={'/laptops'} className="dropdown-item">Laptops</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <CartBox/>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;