import mongoose from "mongoose";


const notesSchema = new mongoose.Schema({  
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "userModel",
        required: true
    },
    topic:{
        type:String ,
        required: true
    },
    classLevel:String,
    examType:String,

    revisionMode:{
        type: Boolean,
        default: false
    },

    includeDiagram:Boolean,
    includeChart:Boolean,

    content:{
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
} ,{timestamps:true})

const note = mongoose.model("note", notesSchema)

export default note