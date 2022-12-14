import {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {useAppSelector} from "../../store/hooks";

import {showNotifyInfo} from "../../helpers";

import CartProductCard from "../Cards/CartProductCard";
import ProductsSection from "../ProductsSection";
import AppModal from "../AppModal";
import CheckoutForm from "../CheckoutForm";

const Cart: FC = () => {

    const {cart} = useAppSelector(state => state.cart);
    const {products} = useAppSelector(state => state.products);

    const [cartProductsIDs, setCartProductsIDs] = useState<number[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            //@ts-ignore https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1195#issuecomment-977170733
            behavior: 'instant'
        });
    }, []);

    useEffect(() => {
        if (cart.products.length === 0) {
            navigate('/');
            showNotifyInfo('Your cart is empty.');
        } else {
            setCartProductsIDs(cart.products.map(el => el.id));
        }
    }, [cart.products]);

    return (
        <>
            <AppModal {...{showModal, setShowModal}}>
                <CheckoutForm/>
            </AppModal>
            <div className='Cart d-flex flex-column justify-content-center my-5 mx-30pc'>
                {!!cart.products.length && cart.products.map((product) =>
                    <CartProductCard key={product.id} product={product}/>
                )}
            </div>

            <div className="row justify-content-center align-items-center mb-5 w-100">
                <h5 className="col-2 fw-normal mb-0 text-black">Subtotal: ${cart.totalPrice}</h5>
                <button
                    className="col-2 btn btn-secondary btn-block"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Proceed to checkout
                </button>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">Recommended for you</h2>
                        {cartProductsIDs.length === products.length &&
                            <div className="text-center mt-5">
                                <span className='fs-5'>Wow, we have no more products!</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <ProductsSection category={'all'} numOfProducts={4} productsIDsToFilter={cartProductsIDs}/>
        </>
    );
};

export default Cart;