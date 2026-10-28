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

export async function updateComment(
    commentId: string,
    newContent: string
) {
   const response = await api.patch(`/posts/comments/${commentId}`, {
    newContent,
   }) 

   return response.data
}

export async function deleteComment(commentId: string){
    const response = await api.delete(`/posts/comments/${commentId}`)

    return response.data
}