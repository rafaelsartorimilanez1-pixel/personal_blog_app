import express from "express";
import { createNewPostController, getAllPostsController } from "../controllers/postController";

const router = express.Router()

// rota para renderizar todos os posts
router.get("/posts", getAllPostsController)

router.post("/post", createNewPostController)

export default router