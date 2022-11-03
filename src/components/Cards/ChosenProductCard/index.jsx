import {useContext, useEffect, useRef} from 'react';


import './style.scss';

const ChosenProductCard = ({product}) => {

    const inputRef = useRef(null);
    const addBtnRef = useRef(null);

    // useEffect(() => {
    //     checkIfOutOfStock(product, addBtnRef, inputRef)
    // }, [cartProducts]);

    return (
        <div className="ChosenProductCard container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
                <div className="col-md-6">
                    <img
                        className="card-img-top mb-5 mb-md-0"
                        src={product.thumbnail}
                        alt={product.title}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="display-4 fw-bolder">
                        {product.title}
                    </h1>
                    <div className="mb-2">
                        <div className="d-flex small text-warning">
                            {/*{getProductRating(product.rating)}*/}
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
                            min={1}
                            style={{maxWidth: "3rem"}}
                            onFocus={() => inputRef.current.select()}
                            onKeyDown={(e) => {
                                // if (e.key === 'Enter') addChosenProductToCart(product, inputRef)
                            }}
                        />
                        <div
                            ref={addBtnRef}
                            className="btn btn-outline-dark flex-shrink-0"
                            onClick={() => {
                                // addChosenProductToCart(product, inputRef)
                            }}
                        >
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