import type { Comment } from "../interface/commentInterface";
import { verifyAdminID } from "../repository/adminRepository";
import { findCommentById, newCommentRepository, patchCommentRepository, deleteCommentRepository } from "../repository/commentRepository";
import { findPostById } from "../repository/postRepository";


export function newCommentService(content: Comment, userId: string, postId: any){

    //verifica se usuário está logado

    //verifica se post existe
    const post = findPostById(postId)

    if(!post){
        throw new Error("Não foi possivel encontrar a postagem")
    }

    if(!content){
        throw new Error("Comentário inválido")
    }

    const comment = newCommentRepository(content, userId, postId)

    return comment
}

export async function patchCommentService(userId: string, newContent: string, commentId: any) {
    
    //verifica se comentário existe
    const comments = findCommentById(commentId)

    if(!comments){
        throw new Error("Comentário não encontrado")
    }

     if(!newContent){
         throw new Error("adicione um comentario valido")
     }

    const patchComment = await patchCommentRepository(newContent, commentId)

    return patchComment
}

export async function deleteCommentService(id: string, userId: string){

        //verifica se comentário existe
    const comments = await findCommentById(id)

    if(!comments || comments.length === 0){
        throw new Error("Comentário não encontrado")
    }

    const isAdmin = verifyAdminID(userId)
    const isOwner = comments[0].user_id === userId

    if(!isAdmin || !isOwner){
        throw new Error("Você não tem permissão para deletar este comentário.")
    }
    return await deleteCommentRepository(id)

}