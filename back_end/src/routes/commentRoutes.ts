import express from "express"
import { newPostController, patchCommentController } from "../controllers/commentController";

const router = express.Router();

router.post("/posts/:postId/comments", newPostController)

router.patch("/posts/comments/:commentId", patchCommentController)


export default router