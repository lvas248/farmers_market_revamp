import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    entity: {},
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        removeUser: ( state )=>{
            state.entity = initialState
            state.error = null
            state.status = 'idle'
        },
        addUser: ( state, action )=>{
            state.entity = action.payload
            state.error = null
            state.status = 'idle'
        }

    },


})

export const { removeUser, addUser } = userSlice.actions
export default userSlice.reducer;