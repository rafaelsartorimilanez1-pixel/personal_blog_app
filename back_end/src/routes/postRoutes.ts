import express from "express";
import { getAllPostsController } from "../controllers/postController";

const router = express.Router()

// rota para renderizar todos os posts
router.get("/posts", getAllPostsController)

export default router