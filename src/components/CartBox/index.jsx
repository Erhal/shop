import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateCartParams} from "../../store/slices/cart";

import CartBoxFull from "./CartBoxFull";
import CartBoxEmpty from "./CartBoxEmpty";

import {useUpdateCartMutation} from "../../store/api/cart";

import updateCart from "../../helpers/api/updateCart";

import './style.scss'

const CartBox = () => {

    const {cart} = useSelector(state => state.cart);

    const [updateCartMutation] = useUpdateCartMutation();

    const dispatch = useDispatch();
    const cartBoxRef = useRef(null);
    const overlayRef = useRef(null);

    const toggleCartBoxVisibility = () => {
        cartBoxRef.current.classList.toggle('hidden');
        overlayRef.current.classList.toggle('hidden');
    }

    useEffect(() => {
        if (cart.products.length > 0) {
            updateCart(cart, updateCartMutation, dispatch)
        } else {
            dispatch(updateCartParams({
                totalQuantity: 0,
                discountedTotal: 0,
            }))
        }
    }, [cart]);

    return (
        <div className='CartBox'>
            <div ref={overlayRef} className="overlay hidden" onClick={toggleCartBoxVisibility}></div>
            <form className="d-flex">
                <button className="cart-btn btn btn-outline-dark" type="button" onClick={toggleCartBoxVisibility}>
                    <i className="bi-cart-fill me-1"></i>
                    Cart
                    <span className="badge bg-dark text-white ms-1 rounded-pill">{cart.totalQuantity}</span>
                </button>
                <div ref={cartBoxRef} className="cart-box hidden">
                    {cart.products.length === 0 && <CartBoxEmpty/>}
                    {cart.products.length !== 0 && <CartBoxFull {...{toggleCartBoxVisibility}}/>}
                </div>
            </form>
        </div>
    );
};

export default CartBox;
