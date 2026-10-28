import {type Request, type Response} from "express"
import jwt from 'jsonwebtoken'
import { newCommentService, patchCommentService, deleteCommentService, getAllCommentsInPostService } from "../services/commentService"

export async function getAllCommentsInPostController(req:Request, res:Response){

    try{

        const postId = req.params.postId

        if (typeof postId !== "string") {
            return res.status(400).json({ error: "ID do post invalido" })
        }

        const getComments = await getAllCommentsInPostService(postId)

        res.json(getComments)

    }catch (error) {

        return res.status(400).json(
            "Erro ao buscar comentários"
        )
    }
}

export async function newCommentController(req: Request, res: Response){

    try {
       const {content}= req.body 

        const userId = (req.user as jwt.JwtPayload).userId

       const {postId} = req.params

       if (typeof postId !== "string" || typeof userId !== "string") {
           return res.status(400).json({ error: "ID do post ou usuário inválido" })
       }

       const contentComment = await newCommentService(content, userId, postId)

       res.json(contentComment)

    } catch (error) {
        
        return res.status(400).json({
            error: error instanceof Error ? error.message : 'Erro ao criar comentario'
        })
    }
}

export async function patchCommentController(req:Request, res:Response){

    try {
        const {newContent}= req.body 

        const userId = (req.user as jwt.JwtPayload).userId

        const {commentId} = req.params

        const patchComment = await patchCommentService(userId, newContent, commentId)

        return res.json(patchComment)
    } catch (error) {
        
        return res.status(400).json({
            error: error instanceof Error ? error.message : 'Erro ao atualizar comentario'
        })
    }
}

export async function deleteCommentController(req: Request, res: Response){

    try {
        const commentId = req.params.commentId

        const userId = (req.user as jwt.JwtPayload).userId

        if (typeof commentId !== "string") {
            return res.status(400).json({ error: "ID do comentario invalido" })
        }

        await deleteCommentService(commentId, userId);

        return res.json({
            message : "comentario deletado com sucesso!"
        })

    } catch (error) {
        return res.status(400).json({
            error: error instanceof Error ? error.message : 'Erro ao deletar comentario'
        })
    }
}