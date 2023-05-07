import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
import bcrypt from 'bcrypt'

export const newUser=async(req,res)=>{
    try {
        const {name,dob,schoolingIn,profession,
        college,course,year,company,sleepTime,
        smoking,drinking,nonVeg,gym,travelling,room,loudmusic,
        interests,bio,email, password}=req.query;

        if(!name || !email || !password|| !dob || !profession || !sleepTime || !loudmusic || !bio ){
                return res.status(404)
                .json({
                    success:false,
                    message:"Please enter all details"
                })
            }

            let user= await User.findOne({email})
            if(user){
               return res.status(404)
                .json({
                    success:false,
                    message:"User already exists"
                })
            }

            user = await User.create({
                name,dob,schoolingIn,profession,
        college,course,year,company,sleepTime,
        smoking,drinking,nonVeg,gym,travelling,loudmusic,
        interests,bio,email, password,room
            })
        
        sendToken(res,user,200,"User Created Successfully")
    } catch (error) {
        res.status(200)
        .json({
            success:false,
            message:error.message
        })
    }
}

export const login=async(req,res)=>{
  try {
    const {email,password}=req.query
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return res.status(404)
        .json({
            success:false,
            message:"The Email or Password is wrong"
        })
    }

    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(404)
        .json({
            success:false,
            message:"The Email or Password is wrong"
        })
    }

    sendToken(res,user,200,"You are successfully logged in")


  } catch (error) {
    res.status(404)
    .json({
        success:false,
        message:error.message
    })
  }
}


export const searchRoomies=async(req,res)=>{
    try {
        const {name,dob,schoolingIn,profession,
            college,course,year,company,sleepTime,
            smoking,drinking,nonVeg,gym,travelling,loudmusic,room,
            interests,Bio,email, password}=req.query;

            let users=await User.find({dob,schoolingIn,profession, gym,college,course,
                year,company,sleepTime,smoking,drinking,nonVeg,room,travelling,loudmusic,})

            res.status(200)
            .json({
                success:true,
                message:'These are the roomies you want',
                users
            })
    } catch (error) {
        res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}

export const editInfo=async(req,res)=>{
    try {
        const {name,dob,schoolingIn,profession,
            college,course,year,company,sleepTime,
            smoking,drinking,nonVeg,gym,travelling,loudmusic,
            interests,Bio,email, room}=req.query;

            const user = await User.findById(req.user._id)
            user.name=name
            user.dob=dob
            user.schoolingIn=schoolingIn
            user.profession=profession
            user.college=college
            user.course=course
            user.year=year
            user.company=company
            user.sleepTime=sleepTime
            user.smoking=smoking
            user.drinking=drinking
            user.nonVeg=nonVeg
            user.gym=gym
            user.travelling=travelling
            user.loudmusic=loudmusic
            user.interests=interests
            user.Bio=Bio
            user.email=email
            user.room=room
            

            await user.save()

            res.status(200)
            .json({
                success:true,
                message:"All the information edited",
                user
            })

    } catch (error) {
        res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}

export const updatePassword=async(req,res)=>{
    try {
        const {password}=req.query;

        const user= await User.findById(req.user._id).select("+password")
        user.password=user.password
        await user.save()

        res.status(200)
        .json({
            success:true,
            message:"Password updated"
        })
            

    } catch (error) {
        res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}