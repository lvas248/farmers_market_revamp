import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const initialState = {
    entity: [],
    status: 'idle',
    error: null
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers:{}
})

export default orderSlice.reducer