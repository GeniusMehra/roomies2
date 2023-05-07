import { Router } from "express";
import { addRoom, addRoomies, deleteRoom, deleteRoomies } from "../controllers/Room.js";

const router = Router()

router.route("/addroom").post(addRoom)
router.route("/deleteroom").delete(deleteRoom)
router.route("/deleteroomie").delete(deleteRoomies)
router.route("/addroomie").post(addRoomies)
router.route("/editroom").put(addRoomies)
router.route("/searchroom").put(addRoomies)


export default router