import React, {createRef, useContext, useEffect} from 'react';
import AppContext from "../../../providers/AppContext";

const CartProductCard = ({product}) => {
    const {
        cartProducts,
        setProductQuantity,
        getCartProductTotalPrice,
        deleteProduct,
        checkIfOutOfStock
    } = useContext(AppContext);

    const inputRef = createRef();
    const addBtnRef = createRef();

    useEffect(() => {
        inputRef.current.value = product.quantity;
        if (inputRef.current.value > product.stock) {
            inputRef.current.value = product.stock;
        }
        if (inputRef.current.value < 1) {
            deleteProduct(product.id);
        }
    }, [cartProducts]);

    useEffect(() => {
        checkIfOutOfStock(product, addBtnRef)
    }, [cartProducts]);

    return (
        <div className="card rounded-3 mb-4">
            <div className="card-body p-4">
                <div className='position-absolute text-secondary top-0 end-0 mt-1 me-1'>
                    <i className="bi bi-trash" role="button" onClick={() => deleteProduct(product.id)}></i>
                </div>
                <div className="row d-flex justify-content-between align-items-center" style={{height: '80px'}}>
                    <div className="col-4 text-center">
                        <img
                            src={product.images[0]}
                            className="rounded-3"
                            alt={product.title}
                            style={{
                                maxWidth: "85px",
                                maxHeight: "85px",
                            }}
                        />
                    </div>
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
                            max={product.stock}
                            min={1}
                            className="form-control form-control-sm text-center"
                        />
                        <div ref={addBtnRef} className='cursor-pointer ms-1'
                             onClick={() => setProductQuantity(product.id, product.quantity + 1)}>
                            <span>+</span>
                        </div>
                    </div>
                    <div className="col-5 text-center">
                        <h5 className="fw-normal mb-0">{product.title.split(`${product.brand} `)[1] || product.title}</h5>
                        <div className='badge text-secondary mb-1 mx-auto'>
                            <span>({product.brand.toLowerCase().split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')})</span>
                        </div>
                        <p className="mb-0 text-success">${getCartProductTotalPrice(product)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProductCard;