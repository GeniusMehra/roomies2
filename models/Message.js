import mongoose, { mongo } from "mongoose";

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sendername:{
    type:String,
    required:true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receivername:{
    type:String
  },
  Pg: {
    type: String
  },
  Likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
    },
  ],
  noLikes:{
    type:Number,
    default:0
  },
  Comments: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  ChatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatID",
  },
  Category: {
    type: "String",
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
  seen:Boolean,
});

export const Message = mongoose.model("Message", MessageSchema);
