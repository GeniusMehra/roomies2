import {Chat} from '../models/Chat.js'

export const chat=async(req,res)=>{
    try {
        const {senderId}=req.query;
        const id=req.user._id

        let chat = await Chat.findOne({"users":[senderId,id]})
        
        if(!chat){
            chat = await Chat.create({
                users:[id,senderId]
            })
        }

        res.status(200)
        .json({
            success:true,
            message:"These are my chats",
            chat
        })

    } catch (error) {
        res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}

export const searchChats=async(req,res)=>{
    try {
        const id=req.user._id
        const chats=await Chat.find({users:id})
        res.status(200)
        .json({
            success:true,
            message:"This is it",
            chats
        })
    } catch (error) {
        res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}