import { Router } from "express";
import { chat, searchChats } from "../controllers/Chat.js";
import { authentication } from "../middlewares/auth.js";

const router = Router()

router.route("/chat").post(authentication, chat)

router.route("/search").get(authentication, searchChats)

export default router