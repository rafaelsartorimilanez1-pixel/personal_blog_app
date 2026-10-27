import {type Request, type Response} from "express"
import jwt from "jsonwebtoken"
import { createPostService, deletePostService, getPostByIdService, getPostsService, updatePostService } from "../services/postService"
import type { Post } from "../interface/postInterface"

export async function getAllPostsController(req:Request, res:Response){

    try {
        
        const posts = await getPostsService()   

        res.json(posts)

    } catch (error) {
        
        console.error(error);

        return res.status(500).json({
            error: "Erro ao buscar posts"
        });
    }
}

export async function getPostByIdController(req:Request, res: Response) {
    
    try {
        const { id }= req.params

        if (typeof id !== "string") {
            return res.status(400).json({
                message: "ID da postagem inválido."
            })
        }

    const post = await getPostByIdService(id)

    return res.status(200).json(post)
    } catch (error) {
        return res.status(400).json({
            message: "Não foi possivel procurar a postagem."
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

export async function deletePostController(req: Request, res: Response){

    try {
        const { id } = req.params

        if (typeof id !== "string") {
            return res.status(400).json({
                message: "ID da postagem inválido."
            })
        }

        const userId = (req.user as jwt.JwtPayload).userId

        await deletePostService(id, userId)

        return res.status(200).json({
            message: "Deletado com sucesso."
        })

    } catch (error) {
        
         return res.status(400).json({
            message: "Não foi possivel deletar a postagem."
        })
    }
}