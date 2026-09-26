import express from "express"
import { newPostController } from "../controllers/commentController";

const router = express.Router();

router.post("/posts/:postId/commentsi", newPostController)


export default router