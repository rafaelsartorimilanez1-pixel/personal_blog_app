import {getUsersServices} from "../services/userService"
import type {Request, Response} from "express"

export async function getAllUsersController(req: Request, res: Response): Promise<Response>{

    try {
        const users = await getUsersServices()

        return res.json(users)

    } catch (error) {
        
        console.log(error)

        return res.status(500).json({
            error: "Erro ao buscar dados"
        })
    }

}

