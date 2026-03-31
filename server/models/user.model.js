import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

const userSchema = new mongoose.Schema({  
    name:{
        type:string ,
        required: true
    },
    email:{
        type:string,
        unique: true,
        required: true
    },
    credits:{
        type: Number,
        default:100,
        min:0

    },
    isCreditAvailable:{
        type: boolean,
        default:true
    },
    notes:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "notes",
        default: []
    }
} ,{timestamps:true})

const userModel = mongoose.model("userModel", userSchema)

export default userModel