import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userShema = new Schema(
    {
        name: {
            type: String,
            required: [true]
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        refreshToken:{
            type: String
        }
    },
    {
        timestamps: true
    }
)

userShema.pre("save", async function(next){
    if(!this.isModified("password")) return next;
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userShema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userShema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            name : this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userShema.methods.refreshAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userShema)