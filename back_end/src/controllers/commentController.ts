import {type Request, type Response} from "express"
import jwt from 'jsonwebtoken'
import { newCommentService, patchCommentService, deleteCommentService } from "../services/commentService"

export function newCommentController(req: Request, res: Response){

    try {
       const {content}= req.body 

        const userId = (req.user as jwt.JwtPayload).userId

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
        const {newContent}= req.body 

        const userId = (req.user as jwt.JwtPayload).userId

        const {commentId} = req.params

        const patchComment = patchCommentService(userId, newContent, commentId)

        res.json(patchComment)
    } catch (error) {
        
        return res.status(400).json({
            error: error instanceof Error ? error.message : 'Erro ao atualizar comentario'
        })
    }
}

export function deleteCommentController(req: Request, res: Response){

    try {
        const commentId = req.params.commentId

        const userId = (req.user as jwt.JwtPayload).userId

        if (typeof commentId !== "string") {
            return res.status(400).json({ error: "ID do comentario invalido" })
        }

        deleteCommentService(commentId, userId);

        return res.json({
            message : "comentario deletado com sucesso!"
        })

    } catch (error) {
        return res.status(400).json({
            error: error instanceof Error ? error.message : 'Erro ao deletar comentario'
        })
    }
}