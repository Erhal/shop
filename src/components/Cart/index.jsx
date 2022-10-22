import React, {useContext, useEffect, useState} from 'react';
import AppContext from "../../providers/AppContext";
import CartProductCard from "../Cards/CartProductCard";
import ProductsSection from "../ProductsSection";
import {useNavigate} from "react-router-dom";

const Cart = () => {
    const {cartProducts, getTotalQuantity, getTotalPrice} = useContext(AppContext);
    const [totalQuantity, setTotalQuantity] = useState(getTotalQuantity())
    const navigate = useNavigate();

    useEffect(() => {
        if (cartProducts.length === 0) navigate('/');
    }, [cartProducts]);

    return (
        <>
            <div className='Cart d-flex justify-content-center my-5'>
                {cartProducts.length > 0 &&
                    <>
                        {cartProducts?.map((product) => {
                            return <CartProductCard key={product.id} product={product}/>
                        })}
                    </>
                }
            </div>

            <div className='recommended'>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="text-center">Recommended for you</h2>
                        </div>
                    </div>
                </div>
            </div>
            <ProductsSection category='all' numOfProducts='4'/>
        </>
    );
};

export default Cart;