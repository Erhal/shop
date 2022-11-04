import {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import CartProductCard from "../Cards/CartProductCard";
import ProductsSection from "../ProductsSection";
import {useSelector} from "react-redux";

const Cart = () => {
    const notifyInfo = (message) => toast.info(<div className='text-center text-dark'> {message} </div>);

    const {cart} = useSelector(state => state.cart);
    const {products} = useSelector(state => state.products);
    const [cartProductsIDs, setCartProductsIDs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (cart.products.length === 0) {
            navigate('/');
            notifyInfo('Your cart is empty.');
        } else {
            setCartProductsIDs(cart.products.map(el => el.id));
        }
    }, [cart.products]);

    return (
        <>
            <div className='Cart d-flex flex-column justify-content-center my-5 mx-30pc'>
                {cart.products.length > 0 && cart.products.map((product) => <CartProductCard key={product.id} product={product}/>)}
            </div>

            <div className="row justify-content-between mb-5">
                <div className="col-4"></div>
                <div className="col-2 mb-4 d-flex align-items-center">
                    <h5 className="fw-normal mb-0 text-black">Subtotal: ${cart.totalPrice}</h5>
                </div>
                <div className="col-2 mb-4 text-end">
                    <Link to={'/cart'}>
                        <button className="btn btn-secondary btn-block" type="button">BUY NOW</button>
                    </Link>
                </div>
                <div className="col-4"></div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">Recommended for you</h2>
                        {cartProductsIDs.length === products.length &&
                            <div className="text-center mt-5">
                                <span className='fs-5'>Wow, we have no more products!</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <ProductsSection category={'all'} numOfProducts={4} productsIDsToFilter={cartProductsIDs}/>
        </>
    );
};

export default Cart;