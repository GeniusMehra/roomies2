import mongoose, { mongo } from "mongoose";

const roomSchema=new mongoose.Schema({
    roomno:{
        type:String,
        required:true
    },
    rent:{
        type:Number,
        required:true
    },floor:{
        type:Number
    },
    sharing:{
        type:Number
    },
    attachedBathroom:{
        type:Boolean
    },
    balcony:Boolean,
    meals:{
        type:Number,
    },
    roomies:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"  
    }],
    pg:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PG"
    }
})

export const Room=mongoose.model("Room",roomSchema)
