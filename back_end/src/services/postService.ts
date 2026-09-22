import type { Post } from "../interface/postInterface";
import type { Response } from "express";
import { verifyAdminID } from "../repository/adminRepository";
import { createPostRepository, getAllPostsRepository } from "../repository/postRepository";

export async function getPostsService() {
    
    return await getAllPostsRepository();
}

export async function createPostService(data: Post, res: Response) {
    
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

    return res.status(200).json(post)
}