import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
    'addTo/cart',
    async( obj, { rejectWithValue })=>{
        const response = await fetch('/cart',{
            method:'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({cart_item: obj})
        })
        const data = await response.json()
        if(response.ok) return data
        return rejectWithValue(data)

    }
)

export const removeFromCart = createAsyncThunk(
    'removeFrom/cart',
    async( obj, { rejectWithValue })=>{
        const response = await fetch(`/cart/${obj.order_item_id}`,{
            method:'DELETE',
         })
        const data = await response

        if(response.ok) return obj.order_item_id

        return rejectWithValue(data)
    }
)

export const updateOrderItem = createAsyncThunk(
    // { "order_item_id": 2,  submitObj: { "product": { "product_id": 6, "order_qty": 9 } } } 
    'updateCartItemQty/cart',
    async( obj, { rejectWithValue })=>{
        const response = await fetch(`/cart/${obj.order_item_id}`,{
            method:'PATCH',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({ cart_item: obj.submitObj})
        })
        const data = await response.json()

        if(response.ok) return data
        return rejectWithValue(data)
    }
)

export const clearCart = createAsyncThunk(
    'clear/cart',
    async( _, { rejectWithValue })=>{
        const response = await fetch('/clear_cart',{
            method:'DELETE',
         })
        const data = await response

        if(response.ok) return 
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
        }, 
        emptyCart: ( state ) =>{
            state.entity = []
        }, 
        removeErrors: ( state )=>{
            state.error = null
        }
    },
    extraReducers: ( builder )=>{
        builder
            .addCase( addToCart.pending, ( state )=>{
                state.status = 'pending'
                state.error = null
            })
            .addCase( addToCart.rejected, ( state, action )=>{
                state.status = 'idle'
                state.error = action.payload
                state.entity = []
            })
            .addCase( addToCart.fulfilled, ( state, action )=>{
                state.status = 'idle'
                state.error = null
                const index = state.entity.findIndex( i => i.id === action.payload.id)

                if(index >= 0){
                    state.entity[index] = action.payload
                }else{
                    state.entity = [...state.entity, action.payload]
                }
                    
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
            .addCase( updateOrderItem.pending,  ( state ) =>{
                state.status = 'pending'
                state.error = null
            })
            .addCase( updateOrderItem.rejected, ( state, action )=>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( updateOrderItem.fulfilled, ( state, action )=>{
                state.status = 'idle'
                state.error = null
                state.entity = state.entity.map( oItem =>{
                    if( oItem.id === action.payload.id) return action.payload
                    else return oItem
                })
            })
            .addCase( clearCart.pending, state => {
                state.status = 'pending'
                state.error = null
            })
            .addCase( clearCart.rejected, ( state, action )=>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( clearCart.fulfilled, ( state )=>{
                state.status = 'idle'
                state.error = null
                state.entity = []
            })

    }
})

export default cartSlice.reducer
export const { addCart, emptyCart, removeErrors } = cartSlice.actions