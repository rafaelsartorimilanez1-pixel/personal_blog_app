import jwt from "jsonwebtoken"
import type { Request, Response } from "express"
import { verifyAdminID } from "../repository/adminRepository"

export async function getAdminStatusController(
    req: Request,
    res: Response
) {
    try{
        const userId = (req.user as jwt.JwtPayload).userId;

        const isAdmin = await verifyAdminID(userId)

        return res.json({isAdmin})
    }catch(error){
        return res.status(500).json({
            error: "Erro ao verificar status de admnistrador"
        })
    }
}