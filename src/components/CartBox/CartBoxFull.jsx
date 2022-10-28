import {Link} from "react-router-dom";

import CartProductCard from "../Cards/CartProductCard";
import {useContext} from "react";
import AppContext from "../../providers/AppContext";

const CartBoxFull = ({ toggleCartBoxVisibility }) => {
    const {cartProducts, getTotalPrice} = useContext(AppContext);

    return (
        <section className="h-100" style={{backgroundColor: "#eee"}}>
            <div className="container h-100 pt-4">
                <div className="row justify-content-center h-100">
                    <div className="col-11">
                        <div className="mb-4">
                            <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                        </div>
                        {cartProducts?.map((product) => <CartProductCard key={product.id} product={product}/>)}
                        <div className="row justify-content-between">
                            <div className="col-1"></div>
                            <div className="col-5 mb-4 d-flex align-items-center">
                                <h5 className="fw-normal mb-0 text-black">Subtotal: ${getTotalPrice()}</h5>
                            </div>
                            <div className="col-5 mb-4 text-end">
                                <Link to={'/cart'}>
                                    <button className="btn btn-secondary btn-block" type="button" onClick={toggleCartBoxVisibility}>View Cart</button>
                                </Link>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartBoxFull;