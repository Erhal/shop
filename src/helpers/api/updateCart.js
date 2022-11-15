import {updateCartParams} from "../../store/slices/cart";

const updateCart = async (cart, updateCartMutation, dispatch) => {
    let body = cart.products
        .map(el => {
            return {id: el.id, quantity: el.quantity}
        })
        .sort((a, b) => a.id - b.id);
    const data = await updateCartMutation(body).unwrap();
    dispatch(updateCartParams({
        totalQuantity: data.totalQuantity,
        discountedTotal: data.discountedTotal,
        products: data.products,
    }))
}

export default updateCart;