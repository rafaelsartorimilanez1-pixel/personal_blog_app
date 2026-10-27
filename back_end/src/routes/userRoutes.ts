import {createUserController, deleteUserController, loginUserController, patchUserController} from "../controllers/userController"

import express from 'express'
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = express.Router();

//Cadastra um novo usuário
router.post('/users/register', createUserController)

//Realiza o login do usuário
router.post('/users/login', loginUserController)

router.patch('/user', authMiddleware, adminMiddleware, patchUserController)

router.delete('/user', authMiddleware, adminMiddleware, deleteUserController)

export default router