import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery(
        {baseUrl: 'https://dummyjson.com/'}
    ),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (category) => category === 'all' ? 'products' : `products/category/${category}`,
            transformResponse: (response) => {
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
        getChosenProduct: builder.query({
            query: (id) => `products/${id}`,
            transformResponse: (product) => {
                product.discountPrice = Math.ceil(product.price - (product.price * product.discountPercentage / 100));
                return product;
            }
        })
    })
})

export const {useGetAllProductsQuery, useGetChosenProductQuery} = productsApi;
export default productsApi;
