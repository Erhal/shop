//TODO: запрос на сервер при изменении корзины
import {createSlice} from "@reduxjs/toolkit";
import addPriceSeparator from "../../helpers/addPriceSeparator";

const initialState = {
    cart: { products: [], totalQuantity: 0, totalPrice: 0 },
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateCartTotalQuantity: (state) => {
            state.cart.totalQuantity = state.cart.products.reduce((acc, product) => acc + +product.quantity, 0);
        },
        updateCartTotalPrice: (state) => {
            state.cart.totalPrice = addPriceSeparator(state.cart.products.reduce((acc, product) => acc + +product.quantity * +product.discountPrice, 0))
        },
        addProductToCart: (state, { payload: {product, quantity} }) => {
            if (state.cart.products.some(el => el.id === product.id)) {
                state.cart.products.find(el => el.id === product.id).quantity += +quantity;
            } else {
                let addedProduct = { ...product, quantity: +quantity };
                state.cart.products.push(addedProduct);
            }
        },
        removeProductFromCart: (state, { payload: {id} }) => {
            state.cart.products = state.cart.products.filter(product => product.id !== id);
        },
        changeProductQuantity: (state, { payload: {id, quantity} }) => {
            state.cart.products.find(el => el.id === id).quantity = +quantity;
        }
    }
});

export const { updateCartTotalQuantity, updateCartTotalPrice, addProductToCart, removeProductFromCart, changeProductQuantity } = cartSlice.actions;

export default cartSlice.reducer;