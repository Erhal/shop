//TODO: запрос на сервер при изменении корзины
import {createSlice} from "@reduxjs/toolkit";
import addSeparator from "../../helpers/addSeparator";

const initialState = {
    cart: {products: [], totalQuantity: 0, totalPrice: 0},
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateCartTotalQuantity: (state) => {
            state.cart.totalQuantity = state.cart.products.reduce((acc, product) => acc + +product.quantity, 0);
        },
        updateCartTotalPrice: (state) => {
            state.cart.totalPrice = addSeparator(state.cart.products.reduce((acc, product) => acc + +product.quantity * +product.discountPrice, 0))
        },
        addProductToCart: (state, {payload}) => {
            if (state.cart.products.some(product => product.id === payload.product.id)) {
                state.cart.products.find(product => product.id === payload.product.id).quantity += payload.quantity;
            } else {
                let addedProduct = {...payload.product, quantity: +payload.quantity};
                state.cart.products.push(addedProduct);
            }
        },
        removeProductFromCart: (state, {payload}) => {
            state.cart.products = state.cart.products.filter(product => product.id !== payload);
        },
        changeProductQuantity: (state, {payload}) => {
            state.cart.products.find(product => product.id === payload.id).quantity = +payload.quantity;
        }
    }
});

export const {updateCartTotalQuantity, updateCartTotalPrice, addProductToCart, removeProductFromCart, changeProductQuantity} = cartSlice.actions;

export default cartSlice.reducer;