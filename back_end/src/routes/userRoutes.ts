import {createUserController, deleteUserController, loginUserController, patchUserController} from "../controllers/userController"

import express from 'express'
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

//Cadastra um novo usuário
router.post('/user', createUserController)

//Realiza o login do usuário
router.post('/login', loginUserController)

router.patch('/user', authMiddleware, patchUserController)

router.delete('/user', authMiddleware, deleteUserController)

export default router