import { createSlice } from "@reduxjs/toolkit";



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
    extraReducers:{}
})

export default orderSlice.reducer

export const { addOrders } = orderSlice.actions