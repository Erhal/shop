import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery(
        {baseUrl: 'https://dummyjson.com/'}
    ),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => 'products',
            transformResponse: (response) => {
                return response.products
                    .filter(product => product.category === 'smartphones' || product.category === 'laptops')
                    .sort((a, b) => a.rating < b.rating ? 1 : -1)
                    .map(product => {
                        return {
                            ...product,
                            discountPrice: Math.round(product.price - (product.price * product.discountPercentage / 100))
                        }
                    })
            }
        })
    })
})

export const {useGetAllProductsQuery} = productsApi;
export default productsApi;
