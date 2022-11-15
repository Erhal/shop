import {createSlice} from "@reduxjs/toolkit";
import productsApi from "../api/products";
import {IProductsState} from "../_types";

const initialState: IProductsState = {
    products: [],
    chosenProduct: {
        id: 0,
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [],
        quantity: 0,
        discountPrice: 0
    },
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