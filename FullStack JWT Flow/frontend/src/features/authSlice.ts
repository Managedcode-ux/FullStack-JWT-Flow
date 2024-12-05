import { createSlice } from "@reduxjs/toolkit";
import { authApi } from '../services/authApi'

interface AuthState{
    user:null|{accessToken:string|null,refreshToken:string|null}
}

const initialState:AuthState = {
    user:null
}

export const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
        },
        clearUser:(state)=>{
            state.user = null
        },
        updateToken:(state,action)=>{
            if(state.user){
                state.user.accessToken = action.payload
            }
        }
    },
    extraReducers:(builder)=>{
        builder
        .addMatcher(authApi.endpoints.signup.matchFulfilled,(state,action)=>{
            state.user = action.payload
        })
        .addMatcher(authApi.endpoints.login.matchFulfilled,(state,action)=>{
            state.user = action.payload
        })
        .addMatcher(authApi.endpoints.logOut.matchFulfilled,(state,action)=>{
            state.user = action.payload
        })
    }
})

export const {setUser,clearUser,updateToken} = authSlice.actions
export default authSlice.reducer