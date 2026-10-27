import api from "./api"

export async function getComments(id:string) {
    const response = await api.get(`/posts/${id}/comments`)

    return response.data
}

export async function createComment(postId: string, content: string){
    const response = await api.post(`/posts/${postId}/comments`, {
        content,
    })

    return response.data
}