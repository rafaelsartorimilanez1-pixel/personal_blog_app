import {type Request, type Response} from "express"
import { createPostService, getPostsService } from "../services/postService"
import type { Post } from "../interface/postInterface"

export async function getAllPostsController(req:Request, res:Response){

    try {
        
        const posts = await getPostsService()

        res.json(posts)

    } catch (error) {
        
        return res.status(500).json({
            error: 'Erro ao buscar posts'
        })
    }
}

export async function createNewPostController(req: Request, res: Response){

    try {
        const dataNewPost: Post = req.body

        const post = await createPostService(dataNewPost)

        res.json(post)
    } catch (error) {
        
        return res.status(400).json({
            error: error instanceof Error ? error.message : 'Erro ao criar post'
        })
    }

}