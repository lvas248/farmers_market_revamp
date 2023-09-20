import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUser, removeUser } from './userSlice'
import { addCart, emptyCart } from "./cartSlice";
import { addOrders } from "./orderSlice";


//create signup async
export const signupUser = createAsyncThunk(
    'signup/user',
    async(obj, { dispatch,  rejectWithValue })=>{
        debugger
        const response = await fetch('/signup',{
            method:'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({user: obj})
        })
        const data = await response.json()

        if(response.ok){
            dispatch(addUser(data.email))
            return data
        }

        return rejectWithValue(data)
        
    }
)
//create login async
export const loginuser = createAsyncThunk(
    'login/session',
    async(obj, { dispatch, rejectWithValue } )=>{
        const response = await fetch('/login',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({user: obj})
        })

        const data = await response.json()

        if(response.ok){ 
            dispatch(addUser(data.email))
            if(data.cart.filtered_order_items) dispatch(addCart(data.cart.filtered_order_items))
            dispatch(addOrders(data.orders.reverse()))
            return data
        }
        return rejectWithValue(data)
    }
)
//create logout async
export const logoutSession = createAsyncThunk(
    'logout/session',
    async( _,{ dispatch, rejectWithValue })=>{
        const response = await fetch('/logout',{
            method: 'DELETE'
        })

        const data = await response

        if(response.ok){
            dispatch(removeUser())
            dispatch(emptyCart())
            return 
        }
        return rejectWithValue(data)

    }
)
//create refresh async
export const refreshSession = createAsyncThunk(
    'refresh/session',
    async( _,{ dispatch, rejectWithValue } )=>{
        const response = await fetch('/me')

        const data = await response.json()
        if(response.ok){ 
         
            dispatch(addUser(data.email))
            if(data.cart.filtered_order_items) dispatch(addCart(data.cart.filtered_order_items))
            dispatch(addOrders(data.orders.reverse()))
            return 
        }
        if(data.cart.filtered_order_items) dispatch(addCart(data.cart.filtered_order_items))
        return rejectWithValue(data)
    }
)

const initialState = {
    loggedIn: false,
    status: 'idle',
    error: null
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers:{
        login: ( state )=>{
            state.loggedIn = true
        },
        logout: ( state )=>{
            state.loggedIn = false
        }, 
        removeErrors: ( state )=>{
            state.error = null
        }

    }, 
    extraReducers: ( builder ) =>{
        builder
            .addCase(signupUser.pending, state =>{
                state.status = 'pending'
                state.error = null
            })
            .addCase( signupUser.rejected, (state, action) =>{
                state.status = 'idle'
                state.error = action.payload.errors
            })
            .addCase( signupUser.fulfilled, (state, action) =>{
                state.status = 'idle'
                state.error = null
                state.loggedIn = true
            })

            .addCase( loginuser.pending, state => {
                state.loggedIn = false
                state.status = 'pending'
                state.error = null
            })
            .addCase( loginuser.rejected, (state,action) => {
                state.loggedIn = false
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( loginuser.fulfilled, state => {
                state.loggedIn = true
                state.status = 'idle'
                state.error = null
            })
            .addCase( refreshSession.pending, state => {
                state.loggedIn = false
                state.status = 'pending'
                state.error = null
            })
            .addCase( refreshSession.rejected, (state,action) => {
                state.loggedIn = false
                state.status = 'idle'
                // state.error = action.payload
            })
            .addCase( refreshSession.fulfilled, state => {
                state.loggedIn = true
                state.status = 'idle'
                state.error = null
            })
            .addCase( logoutSession.pending, state => {
                state.status = 'pending'
                state.error = null
            })
            .addCase( logoutSession.rejected, (state,action) => {
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( logoutSession.fulfilled, state => {
                state.loggedIn = false
                state.status = 'idle'
                state.error = null
            })

    }
})

export const { login, logout, removeErrors } = sessionSlice.actions
export default sessionSlice.reducer