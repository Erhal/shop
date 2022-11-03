import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addProductToCart} from "../../../store/slices/cart";
import checkIfOutOfStock from "../../../helpers/checkIfOutOfStock";
import getProductRating from "../../../helpers/getProductRating";
import './style.scss';
import {toast} from "react-toastify";

const ChosenProductCard = ({ product }) => {

    const {cart} = useSelector(state => state.cart);

    const inputRef = useRef();
    const addBtnRef = useRef();
    const dispatch = useDispatch();

    const notifySuccess = (message) => toast.success(<div className='text-center text-dark'> {message} </div>);

    const handleAddProductToCart = () => {
        const quantity = inputRef.current.value;
        inputRef.current.value = 1;

        dispatch(addProductToCart({ product, quantity }))
        notifySuccess(`${product.title} added to cart`);

    }

    useEffect(() => {
        checkIfOutOfStock(cart, product, addBtnRef, inputRef)
    }, [cart, product])

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
                        {product.title.split(`${product.brand} `)[1] || product.title}
                    </h1>
                    <div className='badge bg-secondary mx-auto mb-2'>
                        <span>{product.brand.toLowerCase().split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')}</span>
                    </div>
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
                            min={1}
                            style={{maxWidth: "3.5rem"}}
                            onFocus={() => inputRef.current.select()}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddProductToCart();
                                    inputRef.current.blur();
                                }
                                if (inputRef.current.value.length > 2) inputRef.current.value = inputRef.current.value = ''
                            }}
                        />
                        <div
                            ref={addBtnRef}
                            className="btn btn-outline-dark flex-shrink-0"
                            onClick={handleAddProductToCart}
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