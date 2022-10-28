import {useContext, useEffect, useRef} from 'react';

import AppContext from "../../../providers/AppContext";

import './style.scss';

const ChosenProductCard = ({product}) => {

    const inputRef = useRef(null);
    const addBtnRef = useRef(null);
    const {addProduct, cartProducts, getProductRating, checkIfOutOfStock} = useContext(AppContext);

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
                    <h1 className="display-4 fw-bolder">
                        {product.title}
                    </h1>
                    <div className="mb-2">
                        <div className="d-flex small text-warning">
                            {getProductRating(product.rating)}
                        </div>
                    </div>
                    <div className="fs-5 mb-5">
                        <span className="discount-price">${product.discountPrice}</span>
                        <span className="price"> - <span
                            className='text-decoration-line-through'>${product.price}</span></span>
                    </div>
                    <p className="lead">{product.description}</p>
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