import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const validateAddress = createAsyncThunk(
    'validate/address',
    async( addressText, { rejectWithValue })=>{
        const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${addressText}&format=json&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`)
        
        const data = await response.json()
        if(response.ok) return data.results
        return rejectWithValue(data)
    }
)




const initialState = {
    entity: [],
    validationResults: [],
    status: 'idle',
    error: null
}

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers:{
        removeAddresses: ( state )=>{
            state.entity = []

        },
        addAddresses: ( state, action )=>{
            state.entity = action.payload
        },
        addAddress: ( state, action )=>{
            if(!state.entity.find( a => a.id === action.payload.id)){
                state.entity = [...state.entity, action.payload ]
            }
        },
        clearValidatedAddresses: ( state ) =>{
            state.validationResults = []
        }
    },
    extraReducers: ( builder ) =>{
        builder
            .addCase( validateAddress.pending, ( state )=>{
                state.status = 'pending'
                state.error = null
            })
            .addCase( validateAddress.rejected, ( state, action )=>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( validateAddress.fulfilled, ( state, action )=>{
                state.status = 'idle'
                state.error = null
                state.validationResults = action.payload
            })
  
            
    }
})
export const { removeAddresses, addAddresses, addAddress, clearValidatedAddresses } = addressSlice.actions

export default addressSlice.reducer