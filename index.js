import express from 'express'
import { config } from 'dotenv'
import { connectBackend } from './data/database.js'
import messageRouter from "./routes/Message.js"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/User.js'
import pgRouter from './routes/PG.js'
import ChatRouter from './routes/Chat.js'
import roomRouter from './routes/Room.js'
import session from 'express-session'
import passport from 'passport'
import {Router} from 'express'
import { connectPassport } from './utils/Providers.js'

const router=Router()

config({
    path:"./data/config.env"
})

connectBackend()
const app=express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));

app.use("/api/v1/messages",messageRouter);
app.use("/api/v1/user",userRouter)
app.use("/api/v1/chat",ChatRouter)
app.use("/api/v1/pg",pgRouter)
app.use("/api/v1/room",roomRouter)
app.use("/api/v1/message",messageRouter)


app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

connectPassport();


app.get(
    "/googlelogin",
    passport.authenticate("google", {
      scope: ["profile"],
    })
  );
  
  app.get(
    "/login",
    passport.authenticate("google")
  );


app.listen(3000,()=>{
    console.log(`Hello world ${process.env.PORT}`)
})