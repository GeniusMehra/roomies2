import mongoose from "mongoose";
import bcrypt  from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },email:String,
    password:{
        type:String,
        minLength:[8,"The password should be at least 8 characters long"],
        select:false
    },
    dob:{
        type:String,
    },
    schoolingIn:{
        type:String,
    },
    profession:{
        type:String,
        required:true
    },
    college:{
        type:String,
    },
    course:{
        type:String
    },
    year:{
        type:String
    },
    company:{
        type:String
    },
    sleepTime:{
        type:String
    },
    smoking:Boolean,
    drinking:Boolean,
    nonveg:Boolean,
    travelling:Boolean,
    loudmusic:Boolean,
    gym:Boolean,
    interests:[{
        type:String
    }],
    Bio:{
        type:String,
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room"
    }

})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
        return next()
    }
    next()
})

userSchema.methods.getJWT=function(){
    return jwt.sign({
        _id:this._id
    },process.env.JWT_SECRET,{
        expiresIn:2*24*60*60*1000
    })
}

export const User=mongoose.model("User",userSchema)