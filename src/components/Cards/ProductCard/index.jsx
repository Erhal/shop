import {useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import checkIfOutOfStock from "../../../helpers/checkIfOutOfStock";
import getProductRating from "../../../helpers/getProductRating";
import './style.scss';
import {addProductToCart} from "../../../store/slices/cart";
import {toast} from "react-toastify";

const ProductCard = ({product}) => {

    const {cart} = useSelector(state => state.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addBtnRef = useRef();

    const notifySuccess = (message) => toast.success(<div className='text-center text-dark'> {message} </div>);

    useEffect(() => {
        checkIfOutOfStock(cart, product, addBtnRef);
    }, [cart, product])

    const handleNavigate = () => {
        navigate(`/product/${product.id}`);
    }

    const handleAddProductToCart = () => {
        dispatch(addProductToCart({product, quantity: 1}));
        notifySuccess(`${product.title} added to cart`);
    }

    return (
        <div className="ProductCard col mb-5 px-3">
            <div className="card h-100 p-1">
                <div className='cursor-pointer' onClick={handleNavigate}>
                    <img
                        className="card-img-top"
                        src={product.thumbnail}
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
                                    {getProductRating(product.rating)}
                                </div>
                            </div>
                            <span className="discount-price">${product.discountPrice}</span><span
                            className="price"> - <s>${product.price}</s></span>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-center pb-4 pt-2 border-top-0 bg-transparent">
                    <div className="btn btn-outline-dark mt-auto"
                         ref={addBtnRef}
                         onClick={() => handleAddProductToCart(product)}
                    >
                        Add to cart
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;