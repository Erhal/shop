import {createRef, useContext, useEffect} from "react";
import AppContext from "../../../providers/AppContext";

const CartProductCardInput = ( {product} ) => {
    const inputRef = createRef();
    const addBtnRef = createRef();
    const {
        cartProducts,
        setProductQuantity,
        checkIfOutOfStock,
        updateInputRef
    } = useContext(AppContext);

    useEffect(() => {
        checkIfOutOfStock(product, addBtnRef);
        updateInputRef(inputRef, product);
    }, [cartProducts]);

    return (
        <div className="col-3 d-flex align-items-center">
            <div className='cursor-pointer me-1'
                 onClick={() => setProductQuantity(product.id, product.quantity - 1)}>
                <span>-</span>
            </div>
            <input
                type={'number'}
                ref={inputRef}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setProductQuantity(product.id, inputRef.current.value)
                        inputRef.current.blur();
                    }
                }}
                onBlur={() => {
                    setProductQuantity(product.id, inputRef.current.value);
                    inputRef.current.blur();
                }}
                onFocus={() => inputRef.current.select()}
                min={0}
                className="form-control form-control-sm text-center"
            />
            <div ref={addBtnRef} className='cursor-pointer ms-1'
                 onClick={() => setProductQuantity(product.id, product.quantity + 1)}>
                <span>+</span>
            </div>
        </div>
    );
};

export default CartProductCardInput;