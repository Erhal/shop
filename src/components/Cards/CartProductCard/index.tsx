import {FC} from "react";
import {ICartProductCardProps} from "./_types";

import {useNavigate} from "react-router-dom";

import {useAppDispatch} from "../../../store/hooks";
import {removeProductFromCart} from "../../../store/slices/cart";

import {addPriceSeparator} from "../../../helpers";

import CartProductCardInput from "./CartProductCardInput";

const CartProductCard: FC<ICartProductCardProps> = ({product, toggleCartBoxVisibility}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const handleRemoveProductFromCart = () => {
        dispatch(removeProductFromCart({
            id: product.id
        }))
    }

    const handleNavigateToProductPage = () => {
        navigate(`/product/${product.id}`)
        if (toggleCartBoxVisibility) toggleCartBoxVisibility();
    }

    return (
        <div className="card rounded-3 mb-4">
            <div className="card-body p-4">
                <div className='position-absolute text-secondary top-0 end-0 mt-1 me-1'>
                    <i className="bi bi-trash" role="button" onClick={handleRemoveProductFromCart}></i>
                </div>
                <div className="row d-flex justify-content-between align-items-center" style={{height: '80px'}}>
                    <div className="col-4 text-center">
                        <img
                            src={product.thumbnail}
                            className="rounded-3"
                            alt={product.title}
                            style={{
                                maxWidth: "90px",
                                maxHeight: "90px",
                                cursor: "pointer"
                            }}
                            onClick={handleNavigateToProductPage}
                        />
                    </div>
                    <CartProductCardInput {...{product}} />
                    <div className="col-4 me-2 text-center cursor-pointer" onClick={handleNavigateToProductPage}>
                        <h6 className="fw-normal mb-0 fw-semibold">{product.title.split(`${product.brand} `)[1] || product.title}</h6>
                        <div className='badge text-secondary mb-1 mx-auto'>
                            {/*<span>({product.brand.toLowerCase().split(/\s+/)?.map(word => word[0].toUpperCase() + word.substring(1)).join(' ')})</span>*/}
                        </div>
                        <p className="mb-0 text-success">${addPriceSeparator(product.discountPrice * product.quantity)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProductCard;