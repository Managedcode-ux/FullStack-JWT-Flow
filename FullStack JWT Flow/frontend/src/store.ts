import { configureStore,combineReducers } from "@reduxjs/toolkit";
import authReducer from './features/authSlice'
import quoteReducer from './features/quoteSlice'
import {quoteApi} from './services/quotesApi'
import { authApi } from "./services/authApi";
import {persistStore,persistReducer}from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key:'root',
    storage,
    blacklist:[quoteApi.reducerPath, authApi.reducerPath]
}

const rootReducer = combineReducers({
    auth:authReducer,
    quote:quoteReducer,
    [quoteApi.reducerPath]: quoteApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
    }}).concat([
        quoteApi.middleware,
        authApi.middleware,        
    ])
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch