import mongoose, {Schema} from "mongoose";

const companyShema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        
    },
    {
        timestamps: true
    }
)