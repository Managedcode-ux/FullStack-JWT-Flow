import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const quoteApi = createApi({
    reducerPath:'quoteAPI',
    baseQuery:fetchBaseQuery(
        {
            baseUrl:'http://localhost:4000',
            prepareHeaders(headers, {getState}) {
                const token = (getState() as RootState)?.auth?.user?.accessToken
                const refreshToken = (getState() as RootState)?.auth?.user?.refreshToken
                if(token){
                    headers.set('authorization',`${token}`)
                }
                if(refreshToken){
                    headers.set('Cookie',`refreshToken=${refreshToken}`)
                }
                return headers
            },
            credentials:'include'
        }
    ),
    endpoints:(builder) => (
        {
            freeQuote:builder.query({
                query:()=>({url:'/random-quote',method:"GET"})
            }),
            premQuote: builder.query({
                query:()=>(
                    {
                        url:'/getProtectedQuotes',
                        method:'GET',
                    }
                )
            })
        }
    )
})

export const  {useFreeQuoteQuery,usePremQuoteQuery}= quoteApi