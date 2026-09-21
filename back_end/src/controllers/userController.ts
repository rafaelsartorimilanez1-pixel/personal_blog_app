import type { User } from "../interface/userInterface"
import {createUserService, getUsersService} from "../services/userService"
import type {Request, Response} from "express"

export async function getAllUsersController(req: Request, res: Response): Promise<Response>{

    try {
        const users = await getUsersService()

        return res.json(users)

    } catch (error) {
        
        console.log(error)

        return res.status(500).json({
            error: "Erro ao buscar usuários"
        })
    }

}

export async function createUserController(req: Request, res: Response){

    try {
        const data: User = req.body

        const register = await createUserService(data)

        return  res.status(201).json(data)
    } catch (error) {
        return res.status(400).json({
            error: error instanceof Error ? error.message : String(error)
        })
    }
}