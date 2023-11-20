import express  from "express";
import { getUser, updateuser } from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.put("/updateuser", updateuser)

export default router
