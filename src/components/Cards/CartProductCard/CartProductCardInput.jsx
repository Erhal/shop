import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {changeProductQuantity, removeProductFromCart} from "../../../store/slices/cart";

import checkIfOutOfStock from "../../../helpers/checkIfOutOfStock";
import showNotifyWarning from "../../../helpers/notify/showNotifyWarning";

const CartProductCardInput = ({ product }) => {
    const {cart} = useSelector(state => state.cart);
    const [productQuantity, setProductQuantity] = useState(product.quantity);

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const addBtnRef = useRef(null);

    useEffect(() => {
        if (productQuantity > product.stock) {
            setProductQuantity(product.stock);
            showNotifyWarning(`Only ${product.stock} units of ${product.title} are available`);
        } else {
            dispatch(changeProductQuantity({product, productQuantity}));
            inputRef.current.value = productQuantity;
        }
    }, [productQuantity]);

    useEffect(() => {
        setProductQuantity(product.quantity);
    }, [cart]);

    useEffect(() => {
        checkIfOutOfStock(cart, product, addBtnRef);
    }, [cart]);

    useEffect(() => {
        if (inputRef.current.value < 1) {
            dispatch(removeProductFromCart({id: product.id}));
        }
    }, [cart]);

    return (
        <div className="col-3 d-flex align-items-center">
            <div className='cursor-pointer me-1'
                 onClick={() => setProductQuantity(+productQuantity - 1)}
            >
                <span>-</span>
            </div>
            <input
                type={'number'}
                ref={inputRef}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setProductQuantity(+inputRef.current.value);
                        inputRef.current.blur();
                    }
                }}
                onBlur={() => {
                    setProductQuantity(+inputRef.current.value);
                    inputRef.current.blur();
                }}
                onFocus={() => inputRef.current.select()}
                min={0}
                className="form-control form-control-sm text-center"
            />
            <div ref={addBtnRef} className='cursor-pointer ms-1'
                 onClick={() => setProductQuantity(+productQuantity + 1)}
            >
                <span>+</span>
            </div>
        </div>
    );
};

export default CartProductCardInput;