import {createRef, FC, MutableRefObject, useEffect} from 'react';

import {updateCartParams} from "../../store/slices/cart";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useUpdateCartMutation} from "../../store/api/cart";

import {updateCart} from "../../helpers";

import CartBoxFull from "./CartBoxFull";
import CartBoxEmpty from "./CartBoxEmpty";

import './style.scss'

const CartBox: FC = () => {

    const {cart} = useAppSelector(state => state.cart);

    const [updateCartMutation] = useUpdateCartMutation();

    const dispatch = useAppDispatch();
    const cartBoxRef = createRef() as MutableRefObject<HTMLDivElement>;
    const overlayRef = createRef() as MutableRefObject<HTMLDivElement>;

    const toggleCartBoxVisibility = () => {
        cartBoxRef.current.classList.toggle('hidden');
        overlayRef.current.classList.toggle('hidden');
    }

    useEffect(() => {
        if (cart.products.length > 0) {
            updateCart(cart, updateCartMutation, dispatch).catch(err => console.log(err));
        } else {
            dispatch(updateCartParams({totalQuantity: 0}))
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
