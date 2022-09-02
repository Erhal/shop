import React from 'react';
import './style.scss'

const CartBox = (props) => {
    return (
        <form className="d-flex cart">
            <button className="cart-btn btn btn-outline-dark" type="button" onClick={props.toggleCartVisibility}>
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="cart-quantity-js badge bg-dark text-white ms-1 rounded-pill">0</span>
            </button>
            <div className="cart-box hidden">
                <div className="cart-box-empty">
                    <h4 className="text-center m-3">Your cart is empty</h4>
                    <p className="text-center">But it's never too late to fix it :)</p>
                </div>
                <div className="cart-box-holder-js">
                    {/*  CART_BOX PRODUCTS WILL BE HERE  */}
                </div>
            </div>
        </form>
    );
};

export default CartBox;
