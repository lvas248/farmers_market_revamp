import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchProduct = createAsyncThunk(
    'fetch/products',
    async( _, { rejectWithValue })=>{
        const response = await fetch('/products')
        const data = await response.json()

        if(response.ok) return data
        return rejectWithValue(data)
    }
)

export const resetInventoryLevels = createAsyncThunk(
    'resetInvetory/products',
    async( _, { rejectWithValue })=>{
        const response = await fetch('/products',{
            method: 'PATCH'
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

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{},
    extraReducers: ( builder ) =>{
        builder
            .addCase( fetchProduct.pending, ( state )=>{
                state.status = 'pending'
                state.error = null
            })
            .addCase( fetchProduct.rejected, ( state, action )=>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( fetchProduct.fulfilled, ( state, action ) =>{
                state.status = 'idle'
                state.error = null
                state.entity = action.payload
            })
            .addCase( resetInventoryLevels.pending, ( state ) =>{
                state.status = 'pending'
            })
            .addCase( resetInventoryLevels.rejected, ( state, action ) =>{
                state.status = 'idle'
                state.error = action.payload
                state.enitity = state.entity.map( p =>  {
                    return {...p, qty_avail: 10 }
                })
            })
    }
})

export default productSlice.reducer