import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    entity: { email: ''},
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        removeUser: ( state )=>{
            state.entity = { email: ''}
            state.error = null
            state.status = 'idle'
        },
        addUser: ( state, action )=>{
            state.entity.email = action.payload
            state.error = null
            state.status = 'idle'
        }

    },


})

export const { removeUser, addUser } = userSlice.actions
export default userSlice.reducer;