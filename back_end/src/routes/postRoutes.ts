import express from "express";
import { createNewPostController, deletePostController, getAllPostsController, updatePostController } from "../controllers/postController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router()

// rota para renderizar todos os posts
router.get("/posts", getAllPostsController)

// rota para criar um post
router.post("/post", authMiddleware, createNewPostController)

// rota para atualizar um post
router.patch("/post/:id", authMiddleware, updatePostController)

router.delete("/post/:id", authMiddleware, deletePostController)

export default router