import type { Comment } from "../interface/commentInterface";
import { newCommentRepository } from "../repository/commentRepository";
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