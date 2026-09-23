import express from "express";
import { createNewPostController, getAllPostsController, updatePostController } from "../controllers/postController";

const router = express.Router()

// rota para renderizar todos os posts
router.get("/posts", getAllPostsController)

// rota para criar um post
router.post("/post", createNewPostController)

// rota para atualizar um post
router.patch("/post/:id", updatePostController)

export default router