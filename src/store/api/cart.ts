import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IUpdateCartBody, IUpdateCartResponse} from "../_types";

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery(
        {baseUrl: 'https://dummyjson.com/carts/'}
    ),
    endpoints: (builder) => ({
        updateCart: builder.mutation<IUpdateCartResponse, {body: IUpdateCartBody}>({
            query: (body) => ({
                url: 'add',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: 1,
                    products: body
                })
            }),
            transformResponse: (response:IUpdateCartResponse) => {
                return response
            }
        }),
    })
})

export const {useUpdateCartMutation} = cartApi;
export default cartApi;
