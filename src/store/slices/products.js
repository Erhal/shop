import {createSlice} from "@reduxjs/toolkit";
import productsApi from "../api/products";

const initialState = {
    products: [],
    chosenProduct: {},
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
        );
        builder.addMatcher(
            productsApi.endpoints.getChosenProduct.matchFulfilled,
            (state, {payload}) => {
                state.chosenProduct = payload
            }
        );
    },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;