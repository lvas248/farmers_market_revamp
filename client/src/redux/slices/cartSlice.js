import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getSubtotal from '../../helpers/subtotal'    

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
        const response = await fetch(`/cart/${obj.cart_item_id}`,{
            method:'DELETE',
         })
        const data = await response

        if(response.ok) return obj.cart_item_id

        return rejectWithValue(data)
    }
)

export const updateCartItem = createAsyncThunk(
    // { "order_item_id": 2,  submitObj: { "product": { "product_id": 6, "order_qty": 9 } } } 
    'updateCartItemQty/cart',
    async( obj, { rejectWithValue })=>{
        const response = await fetch(`/cart/${obj.cart_item_id}`,{
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
    // subtotal: 0,
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
            state.entity.filtered_cart_items = []
            state.entity.cart_subtotal = 0
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

                const index = state.entity.filtered_cart_items.findIndex( i => i.id === action.payload.id)

                if(index >= 0){
                    //When a cart_item containing the product added already exists in cart
                    const updatedCartItems = state.entity.filtered_cart_items.map( i =>{
                        if(i.id === action.payload.id) return action.payload
                        else return i
                    })
                    state.entity.filtered_cart_items = updatedCartItems
                    state.entity.cart_subtotal = getSubtotal(updatedCartItems)

                }else{
                    //When a cart_item continaing the product added does not already exist in cart
                    const updateCartItems =  [...state.entity.filtered_cart_items, action.payload]
                    state.entity.filtered_cart_items = updateCartItems
                    state.entity.cart_subtotal = getSubtotal(updateCartItems)
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
                const filteredCartItems = state.entity.filtered_cart_items.filter( oItem => oItem.id !== action.payload)

                state.status = 'idle'
                state.error = null
                state.entity.filtered_cart_items = filteredCartItems
                state.entity.cart_subtotal = getSubtotal(filteredCartItems)
            })

            .addCase( updateCartItem.pending,  ( state ) =>{
                state.status = 'pending'
                state.error = null
            })
            .addCase( updateCartItem.rejected, ( state, action )=>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( updateCartItem.fulfilled, ( state, action )=>{
                const updatedCartItems = state.entity.filtered_cart_items.map( oItem =>{
                    if( oItem.id === action.payload.id) return action.payload
                    else return oItem
                })

                state.status = 'idle'
                state.error = null
                state.entity.filtered_cart_items = updatedCartItems
                state.entity.cart_subtotal = getSubtotal(updatedCartItems)
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
                state.entity.filtered_cart_items = []
                state.entity.subtotal = 0
            })

    }
})

export default cartSlice.reducer
export const { addCart, emptyCart, removeErrors } = cartSlice.actions