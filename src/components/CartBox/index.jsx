import {useContext, useEffect, useRef, useState} from 'react';

import AppContext from "../../providers/AppContext";

import CartBoxFull from "./CartBoxFull";
import CartBoxEmpty from "./CartBoxEmpty";

import './style.scss'

const CartBox = () => {

    const {cartProducts, getCartProductsQuantity} = useContext(AppContext);
    const [totalQuantity, setTotalQuantity] = useState(null)
    const cartBoxRef = useRef(null);
    const overlayRef = useRef(null);

    const toggleCartBoxVisibility = () => {
        cartBoxRef.current.classList.toggle('hidden');
        overlayRef.current.classList.toggle('hidden');
    }

    useEffect(() => {
        setTotalQuantity(getCartProductsQuantity());
    }, [cartProducts])

    return (
        <div className='CartBox'>
            <div ref={overlayRef} className="overlay hidden" onClick={toggleCartBoxVisibility}></div>
            <form className="d-flex">
                <button className="cart-btn btn btn-outline-dark" type="button" onClick={toggleCartBoxVisibility}>
                    <i className="bi-cart-fill me-1"></i>
                    Cart
                    <span className="badge bg-dark text-white ms-1 rounded-pill">{totalQuantity}</span>
                </button>
                <div ref={cartBoxRef} className="cart-box hidden">
                    {cartProducts.length === 0 && <CartBoxEmpty/>}
                    {cartProducts.length !== 0 && <CartBoxFull {...{toggleCartBoxVisibility}}/>}
                </div>
            </form>
        </div>
    );
};

export default CartBox;
