import type { User } from "../interface/userInterface"
import {createUserService, deleteUserService, loginUserService, patchUserService} from "../services/userService"
import {type Request, type Response} from "express"
import jwt from "jsonwebtoken"

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
        
        console.log(error)

        return res.status(401).json({
            error: "Email ou senha errados!"
        })

    }

}

export async function deleteUserController(req: Request, res: Response) {

    try {

        const idUser = req.params.id

        if (typeof idUser !== "string" || !idUser) {
            return res.status(400).json({
                message: "Id de admin inválido"
            })
        }

        const adminID = (req.user as jwt.JwtPayload).userId

        if (!adminID) {
            return res.status(400).json({
                message: "Foi encontrado um erro nos ID's"
            })
        }

        await deleteUserService(idUser, adminID)

        return res.status(200).json({
            message: "Usuário deletado com sucesso"
        })

    } catch (error) {
        return res.status(400).json({
            error: error instanceof Error ? error.message : String(error)
        })
    }
}

export async function patchUserController(req: Request, res: Response) {
    
    try {
        
        const {idUser}= (req.user as jwt.JwtPayload).userId

        const newDataUser: User = req.body

        if(!idUser || !newDataUser){
            return res.status(400).json({
                message: "Não foi possivel receber os dados corretos"
            })
        }

        await patchUserService(idUser, newDataUser)

        return res.status(200).json({
            message: "Usuário atualizado com sucesso"
        })
    } catch (error) {
        return res.status(400).json({
            error: error instanceof Error ? error.message : String(error)
        })
    }
}