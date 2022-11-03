import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeProductQuantity, removeProductFromCart} from "../../../store/slices/cart";
import checkIfOutOfStock from "../../../helpers/checkIfOutOfStock";
import {toast} from "react-toastify";

const CartProductCardInput = ({product}) => {
    const {cart} = useSelector(state => state.cart);

    const notifyWarning = (message) => toast.warn(<div className='text-center text-dark'> {message} </div>);

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const addBtnRef = useRef(null);

    const handleChangeProductQuantity = (quantity) => {
        dispatch(changeProductQuantity({id: product.id, quantity}))
    }

    useEffect(() => {
        inputRef.current.value = product.quantity;
        checkIfOutOfStock(cart, product, addBtnRef);
    }, [cart]);

    useEffect(() => {
        if (product.quantity > product.stock) {
            dispatch(changeProductQuantity({id: product.id, quantity: product.stock}));
            notifyWarning(`Only ${product.stock} units of ${product.title} are available`);
        }
        if (inputRef.current.value < 1) {
            dispatch(removeProductFromCart({id: product.id}));
        }
    }, [cart]);

    return (
        <div className="col-3 d-flex align-items-center">
            <div className='cursor-pointer me-1'
                 onClick={() => handleChangeProductQuantity(product.quantity - 1)}>
                <span>-</span>
            </div>
            <input
                type={'number'}
                ref={inputRef}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleChangeProductQuantity(inputRef.current.value);
                        inputRef.current.blur();
                    }
                    if (inputRef.current.value.length > 2) inputRef.current.value = inputRef.current.value = ''
                }}
                onBlur={() => {
                    handleChangeProductQuantity(inputRef.current.value)
                    inputRef.current.blur();
                }}
                onFocus={() => inputRef.current.select()}
                min={0}
                className="form-control form-control-sm text-center"
            />
            <div ref={addBtnRef} className='cursor-pointer ms-1'
                 onClick={() =>handleChangeProductQuantity(product.quantity + 1)}
            >
                <span>+</span>
            </div>
        </div>
    );
};

export default CartProductCardInput;