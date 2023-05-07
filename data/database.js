import mongoose from "mongoose";

export const connectBackend=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"Roomies1"
    }).then((c)=>{console.log(`Database Running at  ${c.connection.host}`)})
    .catch((e)=>{console.log(e)})
}