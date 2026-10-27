import express from "express";
import { createNewPostController, deletePostController, getAllPostsController, getPostByIdController, updatePostController } from "../controllers/postController";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = express.Router()

// rota para renderizar todos os posts
router.get("/posts", getAllPostsController)

// rota para pegar ym post pelo id
router.get("/posts/:id", getPostByIdController)

// rota para criar um post
router.post("/post", authMiddleware, adminMiddleware, createNewPostController)

// rota para atualizar um post
router.patch("/post/:id", authMiddleware, adminMiddleware, updatePostController)

router.delete("/post/:id", authMiddleware, adminMiddleware, deletePostController)

export default router