import {FC, MutableRefObject, createRef, useEffect} from 'react';
import {IProductCardProps} from "./_types";

import {useNavigate} from "react-router-dom";

import {addProductToCart} from "../../../store/slices/cart";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";

import {checkIfOutOfStock, getProductRating, showNotifySuccess} from "../../../helpers";

import './style.scss';

const ProductCard: FC<IProductCardProps> = ({product}) => {

    const {cart} = useAppSelector(state => state.cart);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const addBtnRef = createRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        checkIfOutOfStock(cart, product, addBtnRef);
    }, [cart, product])

    const handleNavigate = () => {
        navigate(`/product/${product.id}`);
    }

    const handleAddProductToCart = () => {
        dispatch(addProductToCart({product, quantity: 1}));
        showNotifySuccess(`${product.title} added to cart`);
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
                    <div
                        className="btn btn-outline-dark mt-auto"
                        ref={addBtnRef}
                        onClick={() => handleAddProductToCart()}
                    >
                        Add to cart
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;