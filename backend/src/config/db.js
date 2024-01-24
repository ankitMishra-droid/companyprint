import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectToMongo = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`\nMongoose connected and Host Name: ${connectionInstance.connection.host}`)
    }catch(error){
        console.log(`Mongoose connection failed`, error)
        process.exit(1)
    }
}

export default connectToMongo;