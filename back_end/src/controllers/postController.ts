import {type Request, type Response} from "express"
import { createPostService, getPostsService, updatePostService } from "../services/postService"
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

export function updatePostController(req: Request, res: Response){

    try {
        const { id }= req.params

        if (typeof id !== "string") {
            return res.status(400).json({
                message: "ID da postagem inválido."
            })
        }

        const data: Post = {
            ...req.body,
            id
        }

        const updatePost = updatePostService(data, id)

        return res.json(updatePost)

    } catch (error) {
        
        return res.status(400).json({
            message: "Não foi possivel atualizar a postagem."
        })
    }

}