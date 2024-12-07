import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {updateToken }from '../features/authSlice'

const baseQueryWithReauth = async(args:any,api:any,extraOptions:any) => {
    const result = await fetchBaseQuery({
        baseUrl:'http://localhost:4000',
        prepareHeaders:(headers,{getState})=>{
            const token = (getState() as RootState)?.auth?.user?.accessToken
            if(token){
                headers.set('Authorization',token)
            }
            return headers
        },
        credentials:"include"
    })(args,api,extraOptions)

    if(result.meta?.response?.headers.get('Authorization')){
        const newToken = result.meta?.response?.headers.get('Authorization')

        api.dispatch(updateToken(newToken))
    }
    return result
}

export const quoteApi = createApi({
    reducerPath:'quoteAPI',
    baseQuery:baseQueryWithReauth,
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