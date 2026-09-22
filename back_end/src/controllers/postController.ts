import {type Request, type Response} from "express"
import { getPostsService } from "../services/postService"

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