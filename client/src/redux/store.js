import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import sessionReducer from './slices/sessionSlice'
import productReducer from './slices/productSlice'
import orderReducer from './slices/orderSlice'
import cartReducer from './slices/cartSlice'
import addressReducer from './slices/addressSlice'

const store = configureStore({
    reducer:{
        user: userReducer,
        session: sessionReducer,
        product: productReducer,
        order: orderReducer,
        cart: cartReducer, 
        address: addressReducer
    }
})

export default store;