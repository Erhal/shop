import React, {useContext, useState} from 'react';
import AppContext from "../../providers/AppContext";

const Cart = () => {
    const {cartProducts, getTotalQuantity, getTotalPrice} = useContext(AppContext);
    const [totalQuantity, setTotalQuantity] = useState(getTotalQuantity())

    return (
        <div className='Cart'>
            {cartProducts.length === 0 ?
                <div className="cart-box-empty">
                    <h4 className="text-center display-6 m-3">Your cart is empty</h4>
                    <h5 className="text-center">But it's never too late to fix it :)</h5>
                </div>
                : 'В корзине есть продукты'}
        </div>
    );
};

export default Cart;