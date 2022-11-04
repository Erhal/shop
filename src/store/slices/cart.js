//TODO: запрос на сервер при изменении корзины
import {createSlice} from "@reduxjs/toolkit";
import addPriceSeparator from "../../helpers/addPriceSeparator";
import {toast} from "react-toastify";

const notifyWarning = (message) => toast.warn(<div className='text-center text-dark'> {message} </div>);

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
                    notifyWarning(`Only ${product.stock} units of ${product.title} are available`);
                } else {
                    product = { ...product, quantity: +quantity };
                }
                state.cart.products.push(product);
            }

        },
        removeProductFromCart: (state, { payload: {id} }) => {
            state.cart.products = state.cart.products.filter(product => product.id !== id);
        },
        changeProductQuantity: (state, { payload: {product, quantity, inputRef} }) => {
            if (quantity > product.stock) {
                state.cart.products.find(el => el.id === product.id).quantity = product.stock;
                inputRef.current.value = product.stock;
                notifyWarning(`Only ${product.stock} units of ${product.title} are available`);
            } else {
                state.cart.products.find(el => el.id === product.id).quantity = +quantity;
                inputRef.current.value = quantity;
            }
        }
    }
});

export const { updateCartTotalQuantity, updateCartTotalPrice, addProductToCart, removeProductFromCart, changeProductQuantity } = cartSlice.actions;

export default cartSlice.reducer;