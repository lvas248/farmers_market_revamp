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
    }
})

export default productSlice.reducer