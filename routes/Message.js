import { Router } from "express";
import { deletePost, editPost, likeUnlike, newPost, searchByPg, search } from "../controllers/Message.js";
import { searchRoom } from "../controllers/Room.js";

const router = Router()

router.route("/new").post(newPost)
router.route("/likeunlike").put(likeUnlike)
router.route("/edit").put(editPost)
router.route("/delete").delete(deletePost)
router.route("/searchbypg").get(searchByPg)
router.route("/search").get(search)

export default router