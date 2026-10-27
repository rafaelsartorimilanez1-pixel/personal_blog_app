import api from "./api";

interface UserData{
    name?: string;
    email: string;
    password: string;
}


export async function loginUser(data: UserData) {
    
    const response = await api.post("/users/login", data)

    return response.data
}

export async function registerUser(data: UserData) {

    const response = await api.post("/users/register", data);

    return response
}