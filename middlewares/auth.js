import jwt from 'jsonwebtoken'
import { User } from '../models/User.js';

export const authentication=async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return res.status(404)
        .json({
            success:false,
            message:"Log In First"
        })
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const user=await User.findById(decoded._id)
    req.user=user
    next()
}