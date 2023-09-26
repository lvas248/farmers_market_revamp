import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const validateAddress = createAsyncThunk(
    'validate/address',
    async( _, { rejectWithValue })=>{
        const apiKey = process.env.REACT_APP_HERE_API_KEY
        const response = await fetch(`https://addressvalidation.googleapis.com/v1:validateAddress&key=${apiKey}`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                address: {
                    addressLines: [ '1879 greene ave, 3r', 'ridgewood, ny']
                }
            })
        })
        const data = await response.json()

        debugger

        if(response.ok) return data
        return rejectWithValue(data)
    }
)




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