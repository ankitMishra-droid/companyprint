import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    status: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { user, accessToken, refreshToken} = action.payload
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.status = true
        },

        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.status = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
