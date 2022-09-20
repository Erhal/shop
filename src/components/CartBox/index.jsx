import React, {useRef} from 'react';
import './style.scss'

const CartBox = () => {
    const cartBoxRef = useRef(null);
    const overlayRef = useRef(null);

    const toggleCartVisibility = () => {
        cartBoxRef.current.classList.toggle('hidden');
        overlayRef.current.classList.toggle('hidden');
    }

    return (
        <>
            <div ref={overlayRef} className="overlay hidden" onClick={toggleCartVisibility}></div>
            <form className="d-flex">
                <button className="cart-btn btn btn-outline-dark" type="button" onClick={toggleCartVisibility}>
                    <i className="bi-cart-fill me-1"></i>
                    Cart
                    <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
                </button>
                <div ref={cartBoxRef} className="cart-box hidden">
                    <div className="cart-box-empty">
                        <h4 className="text-center m-3">Your cart is empty</h4>
                        <p className="text-center">But it's never too late to fix it :)</p>
                    </div>
                    <div>
                        {/*  CART_BOX PRODUCTS WILL BE HERE  */}
                    </div>
                </div>
            </form>
        </>
    );
};

export default CartBox;
