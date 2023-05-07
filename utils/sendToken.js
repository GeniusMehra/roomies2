import jwt from "jsonwebtoken"


export const sendToken=async(res,user,statusCode,message)=>{
const token= await user.getJWT()
res.status(statusCode)
.cookie("token",token,{
    httpOnly:true,
    expires:new Date(Date.now() + 2*24*60*60*1000)
})
.json({
    success:true,
    message:message,
    user:user
})
}