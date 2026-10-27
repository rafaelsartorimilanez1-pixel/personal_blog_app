
import type { Request, Response, NextFunction } from "express";
import { verifyAdminID } from "../repository/adminRepository"

export async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;

    if (!user || typeof user === "string" || !("userId" in user)) {
      return res.status(401).json({
        error: "Usuário não autenticado"
      });
    }

    const isAdmin = await verifyAdminID(user.userId as string);

    if (!isAdmin) {
      return res.status(403).json({
        error: "Acesso permitido apenas para administradores"
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao verificar permissão de administrador"
    });
  }
}
