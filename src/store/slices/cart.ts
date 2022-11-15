import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addPriceSeparator} from "../../helpers";
import {ICartState, IProduct} from "../_types";

const initialState: ICartState = {
    cart: {
        products: [],
        totalQuantity: 0,
        totalPrice: '0'
    },
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateCartParams: (state, {payload: {totalQuantity}}: PayloadAction<{ totalQuantity: number }>) => {
            state.cart.totalQuantity = totalQuantity;
            state.cart.totalPrice = addPriceSeparator(state.cart.products.map(product => {
                return product.discountPrice * product.quantity
            }).reduce((a, b) => a + b, 0));
        },
        addProductToCart: (state, { payload: {product, quantity} }: PayloadAction<{product:IProduct, quantity: number}>) => {
            const isAlreadyInCart = state.cart.products.some(el => el.id === product.id);
            const isQuantityBiggerThanAvailable = quantity > product.stock;

            if (isAlreadyInCart) {
                if (isQuantityBiggerThanAvailable) {
                    state.cart.products = state.cart.products.map(el => {
                        if (el.id === product.id) {
                            el.quantity = product.stock;
                        }
                        return el;
                    })
                } else {
                    state.cart.products = state.cart.products.map(el => {
                        if (el.id === product.id) {
                            el.quantity += quantity;
                        }
                        return el;
                    })
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
        removeProductFromCart: (state, { payload: {id} } :PayloadAction<{id: number}>) => {
            state.cart.products = state.cart.products.filter(product => product.id !== id);
        },
        changeProductQuantity: (state, { payload: {product, productQuantity} }: PayloadAction<{product: IProduct, productQuantity:number}>) => {
            if (productQuantity > product.stock) {
                state.cart.products = state.cart.products.map(el => {
                    if (el.id === product.id) {
                        el.quantity = product.stock;
                    }
                    return el;
                })
            } else {
                state.cart.products = state.cart.products.map(el => {
                    if (el.id === product.id) {
                        el.quantity = productQuantity;
                    }
                    return el;
                })
            }
        },
        deleteCart: (state) => {
            state.cart = initialState.cart;
        }
    }
});

export const { updateCartParams, addProductToCart, removeProductFromCart, changeProductQuantity, deleteCart } = cartSlice.actions;

export default cartSlice.reducer;