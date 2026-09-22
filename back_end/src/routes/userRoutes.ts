import {createUserController, loginUserController} from "../controllers/userController"

import express from 'express'

const router = express.Router();

//Cadastra um novo usuário
router.post('/user', createUserController)

//Realiza o login do usuário
router.post('/login', loginUserController)

export default router