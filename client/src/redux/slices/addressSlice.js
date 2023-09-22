import { createSlice } from "@reduxjs/toolkit";


// export const fetchProduct = createAsyncThunk(
//     'fetch/products',
//     async( _, { rejectWithValue })=>{
//         const response = await fetch('/products')
//         const data = await response.json()

//         if(response.ok) return data
//         return rejectWithValue(data)
//     }
// )




const initialState = {
    entity: [],
    status: 'idle',
    error: null
}

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers:{
        removeAddresses: ( state )=>{
            state.entity = []
            state.error = null
            state.status = 'idle'
        },
        addAddresses: ( state, action )=>{
            state.entity = action.payload
            state.error = null
            state.status = 'idle'
        }
    },
    // extraReducers: ( builder ) =>{
    //     builder
    //         .addCase( fetchProduct.pending, ( state )=>{
    //             state.status = 'pending'
    //             state.error = null
    //         })
  
            
    // }
})
export const { removeAddresses, addAddresses } = addressSlice.actions

export default addressSlice.reducer