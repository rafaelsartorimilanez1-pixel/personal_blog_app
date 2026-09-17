import {getAllUsersController} from "../controllers/userController"

import express from 'express'

const router = express.Router();

router.get('/users', getAllUsersController);

export default router