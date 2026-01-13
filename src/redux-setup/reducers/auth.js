import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    auth: {
        isAuthenticated: false,
        accessToken: null,
        error: false,
    },
    customer: {
        current: null,
    },
}
const authReducer = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.auth.isAuthenticated = true;
            state.auth.accessToken = action.payload.accessToken;
            state.customer.current = action.payload.customer;
            state.auth.error = false;
        },
        updateProfile: (state, action) => {
        
        },
        logout: (state, action) => {

        },
        refreshToken: (state, action) => {

        },
    },
});
export default authReducer.reducer;
export const { loginSuccess, logout, refreshToken, updateProfile } = authReducer.actions;