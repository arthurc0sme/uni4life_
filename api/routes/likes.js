import express  from "express";
import { getLikes, addLikes , deleteLike} from "../controllers/like.js";

const router = express.Router()

router.get("/", getLikes )
router.post("/", addLikes )
router.delete("/", deleteLike )



export default router