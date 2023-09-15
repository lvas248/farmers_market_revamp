import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
    // obj = { "product": { "product_id": 6, "order_qty": 1 } }
    'addTo/cart',
    async( obj, { rejectWithValue })=>{
        const response = await fetch('/orders',{
            method:'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await response.json()

        if(response.ok) return data
        return rejectWithValue(data)
    }
)

const initialState = {
    entity: [],
    status: 'idle',
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{},
    extraReducers: ( builder )=>{
        builder
            .addCase( addToCart.pending, ( state )=>{
                state.status = 'pending'
                state.error = null
                state.entity = []
            })
            .addCase( addToCart.rejected, ( state, action )=>{
                state.status = 'idle'
                state.error = action.payload
                state.entity = []
            })
            .addCase( addToCart.fulfilled, ( state, action )=>{
                state.status = 'idle'
                state.error = null
                state.entity = action.payload
            })
    }
})

export default cartSlice.reducer