import React from 'react';
import ProductRating from "../ProductRating";

import './style.css'

const ChosenProductCard = ({product}) => {

    const getDiscountPrice = () => {
        return Math.round(product.price - (product.price * product.discountPercentage / 100));
    }

    return (
        <div className="container chosen-product px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
                <div className="col-md-6">
                    <img
                        className="card-img-top mb-5 mb-md-0"
                        src={product.images[0]}
                        alt={product.title}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="display-5 fw-bolder">
                        {product.title}
                    </h1>
                    <div className="mb-2">
                        <div className="d-flex small text-warning">
                            <ProductRating product={product}/>
                        </div>
                    </div>
                    <div className="fs-5 mb-5">
                        <span className="discount-price">${getDiscountPrice()}</span>
                        <span className="price"> - <span
                            className='text-decoration-line-through'>${product.price}</span></span>
                    </div>
                    <p className="lead">
                        {product.description}
                    </p>
                    <div className="d-flex">
                        <input
                            className="form-control text-center me-3"
                            type="num"
                            defaultValue={1}
                            style={{maxWidth: "3rem"}}
                        />
                        <button className="btn btn-outline-dark flex-shrink-0" type="button">
                            <i className="bi-cart-fill me-1"/>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ChosenProductCard;