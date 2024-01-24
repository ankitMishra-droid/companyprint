import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "./authSlice";
import authReducer from "../features/authSlice.js"
// import authMiddleware from "./authMiddleware";

const store = configureStore({
    reducer : {
        auth : authReducer
    },
    // middleware: (getDefaultMiddleware) => 
    // getDefaultMiddleware().concat(authMiddleware),
})

export default store