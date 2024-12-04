import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:4000'}),
    endpoints:(builder)=>(
        {
            signup:builder.mutation({
                query:({username,password})=>({
                    url:'/register',
                    method:'POST',
                    body:{username,password}        
                })
            }),
            login:builder.mutation({
                query:({username,password})=>({
                    url:'/login',
                    method:'POST',
                    body:{username,password}
                })
            }),
            logOut:builder.mutation({
                query:() => ({url:'/logout'})
            })
        }
    ) 
})

export const {
    useSignupMutation,
    useLoginMutation,
    useLogOutMutation} = authApi