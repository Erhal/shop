import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import AppContext from "../../providers/AppContext";

import CartProductCard from "../Cards/CartProductCard";
import ProductsSection from "../ProductsSection";

const Cart = () => {
    const notifyInfo = (message) => toast.info(<div className='text-center text-dark'> {message} </div>);
    const {cartProducts, getTotalPrice} = useContext(AppContext);
    const [cartProductsIDs, setCartProductsIDs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (cartProducts.length === 0) {
            navigate('/');
            notifyInfo('Your cart is empty.');
        } else {
            setCartProductsIDs(cartProducts.map(el => el.id));
        }
    }, [cartProducts]);

    return (
        <>
            <div className='Cart d-flex flex-column justify-content-center my-5 mx-30pc'>
                {cartProducts.length > 0 && cartProducts?.map((product) => <CartProductCard key={product.id} product={product}/>)}
            </div>

            <div className="row justify-content-between mb-5">
                <div className="col-4"></div>
                <div className="col-2 mb-4 d-flex align-items-center">
                    <h5 className="fw-normal mb-0 text-black">Subtotal: ${getTotalPrice()}</h5>
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
                    </div>
                </div>
            </div>
            <ProductsSection category={'all'} numOfProducts={4} productsIDsToFilter={cartProductsIDs}/>
        </>
    );
};

export default Cart;