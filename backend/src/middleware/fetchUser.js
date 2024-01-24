import { Jwt } from "jsonwebtoken";

const JWT_TOKEN = process.env.ACCESS_TOKEN_SECRET;

const fetchUser = (req,res,next) => {
    const token = req.header('auth-token')
    
}