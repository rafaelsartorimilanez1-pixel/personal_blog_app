import {type Request, type Response} from "express"
import type { Comment } from "../interface/commentInterface"
import { newCommentService, patchCommentService } from "../services/commentService"

export function newPostController(req: Request, res: Response){

    try {
       const {userId, content}= req.body 

       const {postId} = req.params

       const contentComment = newCommentService(content, userId, postId)

       res.json(contentComment)

    } catch (error) {
        
        return res.status(400).json({
            error: error instanceof Error ? error.message : 'Erro ao criar comentario'
        })
    }
}

export function patchCommentController(req:Request, res:Response){

    try {
        const {userId, newContent}= req.body 

        const {commentId} = req.params

        const patchComment = patchCommentService(userId, newContent, commentId)

        res.json(patchComment)
    } catch (error) {
        
        return res.status(400).json({
            error: error instanceof Error ? error.message : 'Erro ao atualizar comentario'
        })
    }
}