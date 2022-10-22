import React from 'react';
import Header from "../components/Header";
import Cart from "../components/Cart";

const CartPage = () => {
    return (
        <>
            <Header title={'Cart'}/>
            <Cart/>
        </>
    );
};

export default CartPage;