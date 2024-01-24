import axios from "axios";
import {login, logout} from "./authSlice";

const authMiddleware = (store) => (next) => async(action) => {

    if(action.type === "auth/login"){
        const {email, password} = action.payload;
        try {
            const response = await axios.post("http://localhost:8000/api/v1/login", {
                email, password
            })

            const {user, accessToken, refreshToken} = response.data;
            store.dispatch(login({user, accessToken, refreshToken}))

        } catch (error) {
            console.log("Fetchin error in user data: ", error)
        }
    }

    if(action.type === "auth/logout"){
        try {
            await axios.post("http://localhost:8000/api/v1/logout");

            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")

            store.dispatch(logout())
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    return next(action)
}

export default authMiddleware;