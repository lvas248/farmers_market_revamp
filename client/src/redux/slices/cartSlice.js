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

export const removeFromCart = createAsyncThunk(
    // obj = {id: order_item.id} 
    'removeFrom/cart',
    async( obj, { rejectWithValue })=>{
        const response = await fetch(`/orders/${obj.id}`,{
            method:'DELETE',
         })
        const data = await response

        if(response.ok) return obj.id
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
    reducers:{
        addCart: ( state, action )=>{
            state.entity = action.payload
        }
    },
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
                state.entity = [...state.entity, action.payload]
            })
            .addCase( removeFromCart.pending, ( state )=>{
                state.status = 'pending'
                state.error = null
            })
            .addCase( removeFromCart.rejected, ( state, action )=>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( removeFromCart.fulfilled, ( state, action )=>{
                state.status = 'idle'
                state.error = null
                state.entity = state.entity.filter( oItem => oItem.id !== action.payload)
            })
            
    }
})

export default cartSlice.reducer
export const { addCart } = cartSlice.actions