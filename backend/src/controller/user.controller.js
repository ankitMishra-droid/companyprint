import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import jwt  from "jsonwebtoken";
const generateAccessTokenAndrefreshToken = async(userId) => {
    const user = await User.findById(userId)

    const accessToken = user.generateAccessToken()
    const refreshToken = user.refreshAccessToken()

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false })

    return {accessToken, refreshToken}
}

const registerUser = asyncHandler( async(req, res) => {
    const {name, email, phone, password} = req.body;
    console.log(`email: ${email} \n name: ${name} \n number: ${phone} \n password: ${password}`)

    if ([name, email, phone, password].some((item) => item.trim === '')){
        throw new ApiError(402, 'all fields are necessary')
    }

    const findUser = await User.findOne({
        $or: [{email}, {phone}]
    })

    if (findUser){
        throw new ApiError(403, 'the email or phone already registered')
    }

    const user = await User.create({
        name,
        email,
        phone,
        password
    })

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createUser){
        throw new ApiError(405, 'Something went wrong while creating user')
    }

    return res.status(201).json(
        new ApiResponse(200, "User Created Successfully")
    )
})

const loginUser = asyncHandler( async(req, res) => {
    // req.body
    // check user
    // find user
    // password validate
    // accessToken or refreshToken
    // send cookie

    const {email, password} = req.body;

    console.log(`email: ${email} \n password: ${password}`)

    if (!email){
        throw new ApiError(401, 'enter your mail')
    }

    const findUser = await User.findOne({email})

    if (!findUser){
        throw new ApiError(406, 'user not registered please register first')
    }

    const comparePassword = await findUser.isPasswordCorrect(password)

    if(!comparePassword){
        console.log(`enter valid password`)
        throw new ApiError(404, 'invalid password')
    }

    const {accessToken, refreshToken} = await generateAccessTokenAndrefreshToken(findUser._id)

    const loggedInUser = await User.findById(findUser._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }

    return res.status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "user logged in sucessfully"
        )
    )
})

const logout = asyncHandler( async(req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(201, {}, 'User Logged out')
    )
})

const refreshAccessToken = asyncHandler( async (req, res) => {
    const incomingToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingToken) {
        console.log("Unauthorized User end refresh token")
        throw new ApiError(401, "Unauthorized User end refresh token")
    }

    try {
        const decodedToken = jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET)

        if(!decodedToken){
            throw new ApiError(401, "The provided token can't match in our database")
        }

        const user = await User.findById(decodedToken?._id)

        if(!user){
            throw new ApiError(401, "user token didn't match")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken} = generateAccessTokenAndrefreshToken(user._id)

        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(new ApiResponse(200, {}, 'Token Refreshed Successfully'));

    } catch (error) {
        throw new ApiError(500, error?.message || "Invalid refresh token")
    }
})

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    if(!oldPassword || !newPassword){
        throw new ApiError(401, "old Password mismatch")
    }

    const user = await User.findById(req.user?._id)

    if(!user) {
        throw new ApiError(401, "User not found")
    }

    const isValidPwd = user.isPasswordCorrect(oldPassword)
    
    if(!isValidPwd){
        throw new ApiError(402, "mismatch Password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res.status(200)
    .json(new ApiResponse(201, {}, "Password changed successfully"))
    
})

const getCurrentUser = asyncHandler(async (req,res) => {
    return res
    .status(200)
    .json(201, req.user, "current user fetched suceessfully")
})

const changeUserDetails = asyncHandler( async (req, res) => {
    const { name, email, phone } = req.body;

    if(!name || !email || !phone){
        throw new ApiError(401, "please enter details to update")
    }

    const user = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            name: name,
            email: email,
            phone: phone,
        }
    }, {new: true}).select(" -password ")

    return res
    .status(200)
    .json( new ApiResponse(201, user, "User details updated successfully."))
})

export { registerUser, loginUser, logout, refreshAccessToken, changePassword, getCurrentUser, changeUserDetails }