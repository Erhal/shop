import React, {useContext, useEffect, useRef} from 'react';
import ProductRating from "../ProductRating";

import './style.scss'
import AppContext from "../../../providers/AppContext";

const ChosenProductCard = ({product}) => {

    const inputRef = useRef(null);
    const addBtnRef = useRef(null);
    const {addProduct, cartProducts, checkIfOutOfStock} = useContext(AppContext);

    useEffect(() => {
       checkIfOutOfStock(product, addBtnRef)
    }, [cartProducts]);

    return (
        <div className="ChosenProductCard container px-4 px-lg-5 my-5">
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
                        {product.title.split(`${product.brand} `)[1] || product.title}
                    </h1>
                    <h4>{product.brand.toLowerCase().split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')}</h4>
                    <div className="mb-2">
                        <div className="d-flex small text-warning">
                            <ProductRating product={product}/>
                        </div>
                    </div>
                    <div className="fs-5 mb-5">
                        <span className="discount-price">${product.discountPrice}</span>
                        <span className="price"> - <span
                            className='text-decoration-line-through'>${product.price}</span></span>
                    </div>
                    <p className="lead">
                        {product.description}
                    </p>
                    <div className="d-flex">
                        <input
                            ref={inputRef}
                            className="form-control text-center me-3"
                            type="number"
                            defaultValue={1}
                            style={{maxWidth: "3rem"}}
                        />
                        <div
                            ref={addBtnRef}
                            className="btn btn-outline-dark flex-shrink-0"
                            type="button"
                            onClick={() => {
                                addProduct(product.id, inputRef.current.value, product.title);
                                inputRef.current.value = 1;
                            }}>
                            <i className="bi-cart-fill me-1"/>
                            Add to cart
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ChosenProductCard;