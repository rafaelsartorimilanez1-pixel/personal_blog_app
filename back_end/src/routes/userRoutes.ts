import {createUserController, getAllUsersController} from "../controllers/userController"

import express from 'express'

const router = express.Router();

router.get('/users', getAllUsersController);

router.post('/user', createUserController)

export default router