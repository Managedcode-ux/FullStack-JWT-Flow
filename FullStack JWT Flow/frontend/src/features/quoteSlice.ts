import { createSlice } from "@reduxjs/toolkit";
import { quoteApi } from "../services/quotesApi";

interface quoteDataState{
    data:any
}

const initialState:quoteDataState = {
    data:null
}

export const quoteSlice = createSlice({
    name:'quote',
    initialState:initialState,
    reducers:{
        setData:(state,action)=>{
            state.data = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addMatcher(quoteApi.endpoints.freeQuote.matchFulfilled,(state,action)=>{
            state.data = action.payload
        })
        .addMatcher(quoteApi.endpoints.premQuote.matchFulfilled,(state,action)=> {
            state.data = action.payload
        })
    }
})

export const {setData} = quoteSlice.actions
export default quoteSlice.reducer