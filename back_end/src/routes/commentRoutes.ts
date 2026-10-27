import express from "express"
import { newCommentController, patchCommentController, deleteCommentController, getAllCommentsInPostController } from "../controllers/commentController";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = express.Router();

router.get("/posts/:postId/comments", getAllCommentsInPostController)

router.post("/posts/:postId/comments", authMiddleware, newCommentController)

router.patch("/posts/comments/:commentId", authMiddleware, patchCommentController)

router.delete("/posts/comments/:commentId", authMiddleware, deleteCommentController)


export default router