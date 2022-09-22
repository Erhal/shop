import React, {createRef, useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

import './style.scss'
import ProductRating from "../ProductRating";
import AppContext from "../../../providers/AppContext";

const ProductCard = ({product}) => {

    const {addProduct, cartProducts, checkIfOutOfStock} = useContext(AppContext);
    const navigate = useNavigate();
    const addBtnRef = createRef();

    useEffect(() => {
        checkIfOutOfStock(product, addBtnRef);
    }, [cartProducts]);

    const handleNavigate = () => {
        navigate(`/product/${product.id}`);
    }

    return (
        <div className="ProductCard col mb-5">
            <div className="card h-100 p-1">
                <div className='cursor-pointer' onClick={handleNavigate}>
                    <img
                        className="card-img-top"
                        src={product.images[0]}
                        alt={product.title}
                    />
                    <div className="card-body p-3 pb-4">
                        <div className="text-center">
                            <h5 className="fw-bolder product-name">{product.title.split(`${product.brand} `)[1] || product.title}</h5>
                            <div className='badge bg-secondary mx-auto mb-2'>
                                <span>{product.brand.toLowerCase().split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')}</span>
                            </div>
                            <div className="mb-2">
                                <div className="d-flex justify-content-center small text-warning">
                                    <ProductRating product={product}/>
                                </div>
                            </div>
                            <span className="discount-price">${product.discountPrice}</span><span
                            className="price"> - <s>${product.price}</s></span>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-center pb-4 pt-2 border-top-0 bg-transparent">
                    <div ref={addBtnRef} className="btn btn-outline-dark mt-auto"
                         onClick={() => addProduct(product.id, 1, product.title)}>
                        Add to cart
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;