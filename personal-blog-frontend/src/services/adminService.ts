import api from "./api"

export async function getAdminStatus() {
    const response = await api.get("/admin/status")

    return response.data.isAdmin as boolean
}