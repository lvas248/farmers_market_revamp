import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { emptyCart } from "./cartSlice";

export const submitOrder = createAsyncThunk(
    'submit/order',
    async( obj, { dispatch, rejectWithValue })=>{
        const response = await fetch('/submit_order',{
            method:'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(obj)
         })
        const data = await response.json()

        if(response.ok){ 
            dispatch(emptyCart())
            return data
        }
        return rejectWithValue(data)
    }
)



const initialState = {
    entity: [],
    status: 'idle',
    error: null
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrders: (state, action)=>{
            state.entity = action.payload
        }
    },
    extraReducers: ( builder ) =>{
        builder
            .addCase( submitOrder.pending, state =>{
                state.status = 'pending'
                state.error = null
            })
            .addCase( submitOrder.rejected, ( state, action )=>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( submitOrder.fulfilled, ( state, action ) =>{
                state.status = 'idle'
                state.error = null
                state.entity = [...state.entity, action.payload]
            } )
    }
})

export default orderSlice.reducer

export const { addOrders } = orderSlice.actions