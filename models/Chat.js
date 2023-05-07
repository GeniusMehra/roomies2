import mongoose, { mongo } from "mongoose";

const chatSchema=new mongoose.Schema({
    users:[
        {
        
         type:mongoose.Schema.Types.ObjectId,       
         ref:"User"
            }       
    ] ,
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    latestSender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:new Date(Date.now())
    }
})

export const Chat=mongoose.model("Chat",chatSchema)