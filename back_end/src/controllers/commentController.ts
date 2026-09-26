import {type Request, type Response} from "express"
import type { Comment } from "../interface/commentInterface"
import { newCommentService } from "../services/commentService"

export function newPostController(req: Request, res: Response){

    try {
       const {userId, content}= req.body 

       const {postId} = req.params

       const contentComment = newCommentService(content, userId, postId)

       res.json(content)
    } catch (error) {
        
        return res.status(400).json({
            error: error instanceof Error ? error.message : 'Erro ao criar post'
        })
    }
}