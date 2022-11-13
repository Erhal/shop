import {configureStore} from "@reduxjs/toolkit";

import productsReducer from "./slices/products";
import cartReducer from "./slices/cart";

import productsApi from "./api/products";
import cartApi from "./api/cart";

export default configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,

        [productsApi.reducerPath]: productsApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware, cartApi.middleware),
})