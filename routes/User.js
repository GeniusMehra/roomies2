import { Router } from "express";
import { editInfo, login, newUser, searchRoomies, updatePassword } from "../controllers/User.js";
import { authentication } from "../middlewares/auth.js";

const router = Router()

router.route("/new").post(newUser)

router.route("/login").post(login)

router.route("/searchroomies").get(searchRoomies)

router.route("/edit").put(authentication, editInfo)

router.route("/updatepass").put(authentication,updatePassword)

export default router