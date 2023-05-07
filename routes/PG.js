import { Router } from "express";
import { deletePg, editPg, newPg, search } from "../controllers/PG.js";

const router = Router()

router.route("/search").get(search)

router.route("/new").post(newPg)

router.route("/editpg").put(editPg)

router.route("/deletepg").delete(deletePg)

export default router