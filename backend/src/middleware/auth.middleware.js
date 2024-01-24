import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyJWt = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")

        if(!token){
            throw new ApiError(401, "Unauthorized token")
        }

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodeToken?._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401, "invalid access token")
        }

        req.user = user
        next()
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid access token")
    }
})