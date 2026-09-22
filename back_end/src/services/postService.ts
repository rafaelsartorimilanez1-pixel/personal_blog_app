import { getAllPostsRepository } from "../repository/postRepository";

export async function getPostsService() {
    
    return await getAllPostsRepository();
}