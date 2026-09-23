import type { Post } from "../interface/postInterface";
import type { Response } from "express";
import { verifyAdminID } from "../repository/adminRepository";
import { createPostRepository, findPostById, getAllPostsRepository, updatePostRepository } from "../repository/postRepository";

export async function getPostsService() {
    
    return await getAllPostsRepository();
}

export async function createPostService(data: Post) {
    
    const {admin_id, title, content} = data

    // Verifica se o id_admin realmente existe na tabela admin
    const adminExist = await verifyAdminID(admin_id)

    if(!admin_id || !title || !content){
        throw new Error("Campos obrigatorios faltando")
    }

    if(!adminExist){
        throw new Error("Apenas pessoas com permissão podem criar postagens")
    }

    const post = await createPostRepository(data);

    return post
}

export async function updatePostService(data: Post, idPost: string){

    const {admin_id} = data;

    if (!idPost) {
        throw new Error("Id da postagem não encontrado");
    }

    const findPost = await findPostById(idPost)

    if(!findPost.length || findPost[0].admin_id !== admin_id ){
        throw new Error(
            "Não é possivel editar esta postagem"
        )
    }

    return await updatePostRepository(idPost, data )
}