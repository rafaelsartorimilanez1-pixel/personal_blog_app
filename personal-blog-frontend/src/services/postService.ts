import api from "./api";

export async function getPosts() {
    const response = await api.get("/posts")

    return response.data;
}

export async function getPostById(id: string) {
    const response = await api.get(`/posts/${id}`)

    return response
}