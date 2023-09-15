import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import sessionReducer from './slices/sessionSlice'
import productReducer from './slices/productSlice'


const store = configureStore({
    reducer:{
        user: userReducer,
        session: sessionReducer,
        product: productReducer
    }
})

export default store;