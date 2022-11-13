import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery(
        {baseUrl: 'https://dummyjson.com/carts/'}
    ),
    endpoints: (builder) => ({
        updateCart: builder.mutation({
            query: (body) => ({
                url: 'add',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: 1,
                    products: body
                })
            }),
            transformResponse: (response) => {
                return response
            }
        }),
    })
})

export const {useUpdateCartMutation} = cartApi;
export default cartApi;
