import React from 'react';
import './style.css'
import CartBox from "../CartBox";

const Navbar = () => {
    const toggleCartVisibility = () => {
        const $cartBox = document.querySelector('.cart-box');
        const $overlay = document.querySelector('.overlay');

        $cartBox.classList.toggle('hidden');
        $overlay.classList.toggle('hidden');
    }
    return (
        <>
            {/*  PUSH NOTIFICATIONS  */}
            <div className="toast-container position-fixed"></div>

            {/*  OVERLAY  */}
            <div className="overlay hidden" onClick={toggleCartVisibility}></div>

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
                            <li className="nav-item"><a className="btn-home nav-link active" aria-current="page"
                                                        href="#">Home</a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="btn-all dropdown-item" href="#">All Products</a></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><a className="btn-phones dropdown-item" href="#">Smartphones</a></li>
                                    <li><a className="btn-laptops dropdown-item" href="#">Laptops</a></li>
                                </ul>
                            </li>
                        </ul>
                        <CartBox toggleCartVisibility={toggleCartVisibility}/>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
