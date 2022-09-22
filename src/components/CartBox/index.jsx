import React, {useContext, useEffect, useRef, useState} from 'react';
import './style.scss'
import CartProductCard from "../Cards/CartProductCard";
import AppContext from "../../providers/AppContext";

const CartBox = () => {

    const {cartProducts, getTotalQuantity, getTotalPrice} = useContext(AppContext);
    const [totalQuantity, setTotalQuantity] = useState(getTotalQuantity())
    const cartBoxRef = useRef(null);
    const overlayRef = useRef(null);

    const toggleCartVisibility = () => {
        cartBoxRef.current.classList.toggle('hidden');
        overlayRef.current.classList.toggle('hidden');
    }

    useEffect(() => {
        setTotalQuantity(getTotalQuantity());
    }, [cartProducts])

    return (
        <span className='CartBox'>
            <div ref={overlayRef} className="overlay hidden" onClick={toggleCartVisibility}></div>
            <form className="d-flex">
                <button className="cart-btn btn btn-outline-dark" type="button" onClick={toggleCartVisibility}>
                    <i className="bi-cart-fill me-1"></i>
                    Cart
                    <span className="badge bg-dark text-white ms-1 rounded-pill">{totalQuantity}</span>
                </button>
                <div ref={cartBoxRef} className="cart-box hidden">

                    {cartProducts.length === 0 ?
                        <div className="cart-box-empty mb-5">
                            <h4 className="text-center display-6 m-3">Your cart is empty</h4>
                            <h5 className="text-center">But it's never too late to fix it :)</h5>
                        </div>
                        :
                        <section className="h-100" style={{backgroundColor: "#eee"}}>
                            <div className="container h-100 pt-4">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-11">
                                        <div className="mb-4">
                                            <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                                        </div>
                                        {cartProducts.map((product) => {
                                            return <CartProductCard key={product.id} product={product}/>
                                        })}
                                        <div className="row justify-content-between">
                                            <div className="col-1"></div>
                                            <div className="col-5 mb-4 d-flex align-items-center">
                                                <h5 className="fw-normal mb-0 text-black">Total: ${getTotalPrice()}</h5>
                                            </div>
                                            <div className="col-5 mb-4 text-end">
                                                <button className="btn btn-secondary btn-block" type="button">Checkout</button>
                                            </div>
                                            <div className="col-1"></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    }
                </div>
            </form>
        </span>
    );
};

export default CartBox;
