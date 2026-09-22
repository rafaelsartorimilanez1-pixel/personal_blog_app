import type { User } from "../interface/userInterface"
import {createUserService, loginUserService} from "../services/userService"
import {response, type Request, type Response} from "express"

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

export async function loginUserController(req: Request, res: Response){

    try {
        const loginData: User = req.body

        const login = await loginUserService(loginData)

        return res.status(200).json(login)
    } catch (error) {
        
    }

}