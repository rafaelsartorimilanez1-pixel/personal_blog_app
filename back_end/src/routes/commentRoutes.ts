import express from "express"
import { newCommentController, patchCommentController, deleteCommentController } from "../controllers/commentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/posts/:postId/comments", authMiddleware, newCommentController)

router.patch("/posts/comments/:commentId", authMiddleware, patchCommentController)

router.delete("/posts/comments/:commentId", authMiddleware, deleteCommentController)


export default router