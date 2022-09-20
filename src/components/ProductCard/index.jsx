import React from 'react';
import {useNavigate} from "react-router-dom";

import './style.scss'
import ProductRating from "../ProductRating";

const ProductCard = ({product}) => {
    const navigate = useNavigate();

    const getDiscountPrice = () => {
        return Math.round(product.price - (product.price * product.discountPercentage / 100));
    }

    const handleNavigate = () => {
        navigate(`/product/${product.id}`);
    }

    return (
        <div className="col mb-5">
            <div className="card h-100 p-1">
                <div className='cursor-pointer' onClick={handleNavigate}>
                    <img
                        className="card-img-top"
                        style={{height: 180, maxWidth: 270, objectFit: "contain"}}
                        src={product.images[0]}
                        alt={product.title}
                    />
                    <div className="card-body p-4">
                        <div className="text-center">
                            <h5 className="fw-bolder product-name">{product.title}</h5>
                            <div className="mb-2">
                                <div className="d-flex justify-content-center small text-warning">
                                    <ProductRating product={product}/>
                                </div>
                            </div>
                            <span className="discount-price">${getDiscountPrice()}</span><span className="price"> - <s>${product.price}</s></span>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-center p-4 pt-0 border-top-0 bg-transparent">
                    <button className="btn btn-outline-dark mt-auto">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;