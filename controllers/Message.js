import { Message } from "../models/Message.js";
import {User} from '../models/User.js'
import {PG} from '../models/PG.js'

export const newPost=async(req,res)=>{
    try {
        const {message,sender,receiver,Pg,ChatId,Category,seen}=req.query;
        // if(!message || !sender){
        //     return res.status(404)
        //     .json({
        //         success:false,
        //         message:"Please provide all the necessary details"
        //     })
        // }
let receivername
        const sendername= await User.findById(sender)
        if(receiver){
            receivername= await User.findById(receiver)
        }
        let pgname
        if(Pg){
            pgname=await PG.findById(Pg)
        }

        const post=await Message.create({
            message,
            sender,
            receiver,
            Pg:pgname.name,
            ChatId,
            Category,
            seen,
            sendername:sendername.name,
            receivername:receiver?receivername.name:null,
        })

        res.status(200)
        .json({
            success:true,
            message:"Message posted",
            post
        })
            
    } catch (error) {
        res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}


export const likeUnlike=async(req,res)=>{
try {
    const {id}=req.query
    if(!id){
        return res.status(404)
        .json({
            success:false,
            message:"Please provide the id of the post"
        })
    }
    const post=await Message.findById(id)    
    if(post.Likes.includes(req.user._id)){
        const index=post.Likes.indexOf(req.user._id)
        post.Likes.splice(index,1)
        post.noLikes-=1
        await post.save()
        return res.status(200)
        .json({
            success:true,
            message:"Post Unliked",
            post
        })
    }

    post.Likes.push(req.user._id)
    post.noLikes+=1
    await post.save()
    res.status(200)
    .json({
        success:true,
        message:"Liking unliking done",
        post
    })
} catch (error) {
    res.status(404)
        .json({
            success:false,
            message:error.message
        })
}
}

export const deletePost=async(req,res)=>{
try {
    const {id}=req.query;
    if(!id){
        return res.status(404)
        .json({
            success:false,
            message:"Please provide the id of the post"
        })
    }
    const post=await Message.findOneAndDelete(id)
    res.status(200)
    .json({
        success:true,
        message:"Message deleted",
        post
    })
} catch (error) {
    res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}

export const editPost=async(req,res)=>{
try {
    const {message,id}=req.query;
    if(!id){
        return res.status(404)
        .json({
            success:false,
            message:"Please provide the id of the post"
        })
    }
        const post=await Message.findById(id)
        post.message=message
        await post.save()

        res.status(200)
        .json({
            success:true,
            message:"Message posted",
            post
        })
} catch (error) {
    res.status(404)
        .json({
            success:false,
            message:error.message
        })
}
}

export const searchByPg=async(req,res)=>{
try {
    const {Pg,}=req.query;
    if(!Pg){
        return res.status(404)
        .json({
            success:false,
            message:"Please provide the id of the post"
        })
    }
        const post=await Message.find({
            Pg
        })

        res.status(200)
        .json({
            success:true,
            message:"Message posted",
            post
        })
} catch (error) {
    res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}

export const searchForMessages=async(req,res)=>{
    try {
        const {receiver}=req.query;
        if(!receiver){
            return res.status(404)
            .json({
                success:false,
                message:"Please provide the id of the post"
            })
        }
            const post=await Message.find({
                receiver,
                seen:false
            })
    
            res.status(200)
            .json({
                success:true,
                message:"Message posted",
                post
            })
    } catch (error) {
        res.status(404)
            .json({
                success:false,
                message:error.message
            })
        }
    }
    

export const isLiked=async(req,res)=>{
try {
    const {id}=req.query
    if(!id){
        return res.status(404)
        .json({
            success:false,
            message:"Please provide the id of the post"
        })
    }
    const post=await Message.findById(id)    
    if(post.Likes.includes(req.user._id)){
        return res.status(200)
        .json({
            success:true,
            message:"This is liked post",
            liked:true
        })
    }

    res.status(200)
    .json({
        success:true,
        message:"This is not liked",
        liked:false
    })

} catch (error) {
    res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}

export const likesNumber=async(req,res)=>{
    try {
        const {id}=req.query
        
        const post=await Message.findById(id)
        res.status(200)
        .json({
            success:true,
            message:"This is number of likes",
            likes:post.noLikes
        })
        
    } catch (error) {
        res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}


export const search=async(req,res)=>{
    try {
            const post=await Message.find()
    
            res.status(200)
            .json({
                success:true,
                message:"Message posted",
                post
            })
    } catch (error) {
        res.status(404)
            .json({
                success:false,
                message:error.message,
            })
        }
    }