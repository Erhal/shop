import {createRef, FC, MutableRefObject, useEffect, useState} from "react";
import {ICartProductCardInputProps} from "./_types";

import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {changeProductQuantity, removeProductFromCart} from "../../../store/slices/cart";

import {checkIfOutOfStock, showNotifyWarning} from "../../../helpers";

const CartProductCardInput: FC<ICartProductCardInputProps> = ({product}) => {
    const {cart} = useAppSelector(state => state.cart);
    const [productQuantity, setProductQuantity] = useState<number>(product.quantity);

    const dispatch = useAppDispatch();
    const inputRef = createRef() as MutableRefObject<HTMLInputElement>;
    const addBtnRef = createRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        if (productQuantity > product.stock) {
            setProductQuantity(product.stock);
            showNotifyWarning(`Only ${product.stock} units of ${product.title} are available`);
        } else {
            dispatch(changeProductQuantity({product, productQuantity}));
            inputRef.current.value = productQuantity.toString();
        }
    }, [productQuantity]);

    useEffect(() => {
        setProductQuantity(product.quantity);
    }, [cart]);

    useEffect(() => {
        checkIfOutOfStock(cart, product, addBtnRef);
    }, [cart]);

    useEffect(() => {
        if (+inputRef.current.value < 1) {
            dispatch(removeProductFromCart({id: product.id}));
        }
    }, [cart]);

    return (
        <div className="col-3 d-flex align-items-center">
            <div className='cursor-pointer me-1'
                 onClick={() => setProductQuantity(productQuantity - 1)}
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
                 onClick={() => setProductQuantity(productQuantity + 1)}
            >
                <span>+</span>
            </div>
        </div>
    );
};

export default CartProductCardInput;