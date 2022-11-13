import {createSlice} from "@reduxjs/toolkit";
import addPriceSeparator from "../../helpers/addPriceSeparator";

const initialState = {
    cart: { products: [], totalQuantity: 0, totalPrice: 0 },
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateCartParams: (state, {payload: {totalQuantity, discountedTotal, products}}) => {
            state.cart.totalQuantity = totalQuantity;
            state.cart.totalPrice = addPriceSeparator(discountedTotal);
            products?.forEach(product => {
                state.cart.products.find(el => el.id === product.id).discountedPrice = addPriceSeparator(product.discountedPrice);
            });
        },
        addProductToCart: (state, { payload: {product, quantity} }) => {
            const isAlreadyInCart = !!state.cart.products.some(el => el.id === product.id);
            const isQuantityBiggerThanAvailable = quantity > product.stock;

            if (isAlreadyInCart) {
                if (isQuantityBiggerThanAvailable) {
                    state.cart.products.find(el => el.id === product.id).quantity = product.stock;
                } else {
                    state.cart.products.find(el => el.id === product.id).quantity += +quantity;
                }

            } else {
                if (isQuantityBiggerThanAvailable) {
                    product = { ...product, quantity: product.stock };
                } else {
                    product = { ...product, quantity: +quantity };
                }
                state.cart.products.push(product);
            }

        },
        removeProductFromCart: (state, { payload: {id} }) => {
            state.cart.products = state.cart.products.filter(product => product.id !== id);
        },
        changeProductQuantity: (state, { payload: {product, productQuantity} }) => {
            if (productQuantity > product.stock) {
                state.cart.products.find(el => el.id === product.id).quantity = product.stock;
            } else {
                state.cart.products.find(el => el.id === product.id).quantity = +productQuantity;
            }
        }
    }
});

export const { updateCartParams, addProductToCart, removeProductFromCart, changeProductQuantity } = cartSlice.actions;

export default cartSlice.reducer;