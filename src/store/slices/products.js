import {createSlice} from "@reduxjs/toolkit";
import productsApi from "../api/products";

const initialState = {
    products: [],
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            productsApi.endpoints.getAllProducts.matchFulfilled,
            (state, {payload}) => {
                state.products = payload
            }
        )
    }
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;