import {useContext, useEffect, useRef, useState} from 'react';
import CartProductCard from "../Cards/CartProductCard";
import AppContext from "../../providers/AppContext";
import {Link} from "react-router-dom";

import './style.scss'

const CartBox = () => {

    const {cartProducts, getTotalQuantity, getTotalPrice} = useContext(AppContext);
    const [totalQuantity, setTotalQuantity] = useState(getTotalQuantity())
    const cartBoxRef = useRef(null);
    const overlayRef = useRef(null);

    const toggleCartBoxVisibility = () => {
        cartBoxRef.current.classList.toggle('hidden');
        overlayRef.current.classList.toggle('hidden');
    }

    useEffect(() => {
        setTotalQuantity(getTotalQuantity());
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

                    {cartProducts.length === 0 ?
                            <div className="d-flex flex-column text-center my-5">
                            <div className="display-6">Your cart is empty</div>
                            <div>But it's never too late to fix it :)</div>
                        </div>
                        :
                        <section className="h-100" style={{backgroundColor: "#eee"}}>
                            <div className="container h-100 pt-4">
                                <div className="row justify-content-center h-100">
                                    <div className="col-11">
                                        <div className="mb-4">
                                            <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                                        </div>
                                        {cartProducts?.map((product) => <CartProductCard key={product.id} product={product}/>)}
                                        <div className="row justify-content-between">
                                            <div className="col-1"></div>
                                            <div className="col-5 mb-4 d-flex align-items-center">
                                                <h5 className="fw-normal mb-0 text-black">Subtotal: ${getTotalPrice()}</h5>
                                            </div>
                                            <div className="col-5 mb-4 text-end">
                                                <Link to={'/cart'}>
                                                    <button className="btn btn-secondary btn-block" type="button" onClick={toggleCartBoxVisibility}>View Cart</button>
                                                </Link>
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
        </div>
    );
};

export default CartBox;
