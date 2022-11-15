import {FC} from "react";

import Header from "../components/Header";
import Cart from "../components/Cart";

const CartPage: FC = () => {
    return (
        <>
            <Header title={'Cart'}/>
            <Cart/>
        </>
    );
};

export default CartPage;