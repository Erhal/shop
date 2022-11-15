import {updateCartParams} from "../../store/slices/cart";
import {ICart} from "../../store/_types";

import {AppDispatch} from "../../store";

const updateCart = async (
    cart: ICart,
    updateCartMutation: any,
    AppDispatch: AppDispatch
) => {
    let body = cart.products
        .map(el => {
            return {id: el.id, quantity: el.quantity}
        })
        .sort((a, b) => a.id - b.id);
    const {data} = await updateCartMutation(body);
    AppDispatch(updateCartParams({
        totalQuantity: data.totalQuantity,
    }))
}

export default updateCart;