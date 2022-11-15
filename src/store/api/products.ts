import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IProduct} from "../_types";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery(
        {baseUrl: 'https://dummyjson.com/'}
    ),
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct[], string>({
            query: (category) => category === 'all' ? 'products' : `products/category/${category}`,
            transformResponse: (response: {products: IProduct[]}) => {
                return response.products
                    .filter(product => product.category === 'smartphones' || product.category === 'laptops')
                    .sort((a, b) => a.rating < b.rating ? 1 : -1)
                    .map(product => {
                        return {
                            ...product,
                            discountPrice: Math.ceil(product.price - (product.price * product.discountPercentage / 100))
                        }
                    })
            }
        }),
        getChosenProduct: builder.query<IProduct, string | undefined>({
            query: (id) => `products/${id}`,
            transformResponse: (product: IProduct) => {
                product.discountPrice = Math.ceil(product.price - (product.price * product.discountPercentage / 100));
                return product;
            }
        })
    })
})

export const {useGetAllProductsQuery, useGetChosenProductQuery} = productsApi;
export default productsApi;
