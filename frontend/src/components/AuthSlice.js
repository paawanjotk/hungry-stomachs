import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState:{
        user : null
    },
    reducers: {
        setUser : (state, action) => {
            state.user = action.payload;
        },
        getUser : (state) => {
            return state.user;
        }
    },
})
export const { setUser, getUser } = authSlice.actions;