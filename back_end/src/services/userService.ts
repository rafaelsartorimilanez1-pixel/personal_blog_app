import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { CreateUserRepository, deleteUserRepository, findUserByEmail, patchUserRepository, verifyUserID } from "../repository/userRepository";
import type { User } from '../interface/userInterface';
import { verifyAdminID } from '../repository/adminRepository';
import axios from 'axios'

export async function verifyEmail(email: string) {
        const response = await axios.get("https://apilayer.net/api/check", {
                params: {
                        access_key: process.env.MAIL_API_KEY,
                        email: email,
                },
        })

        return response.data
}

export async function createUserService(data:User){

        const {name, email, password} = data

        if(!name || !email || !password){
                throw new Error("Preencha os dados corretamente")
        } 

        // const isEmailValid = await verifyEmail(email)

        // if(
        //         !isEmailValid.format_valid &&           
        //         !isEmailValid.mx_found &&
        //         !isEmailValid.smtp_check
        // ) { throw new Error("Email está inválido")}

        const existingUser = await findUserByEmail(email)

        if(existingUser){
                throw new Error(
                        "Usuário já cadastrado!"
                )
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await CreateUserRepository({
                ...data, password: hashedPassword
        })

        return user
}

export async function loginUserService(data: User){

        const {email, password} = data

        if(!email || !password){
                throw new Error("Preencha o email e a senha corretamente!")
        }

        const existingUser = await findUserByEmail(email)

        if(!existingUser){
                throw new Error(
                        "Email ou senha errados!"
                )
        }

        const passwordMatch = await bcrypt.compare(
                password,
                existingUser.password_hash
        )

        if(!passwordMatch){
                throw new Error("Email ou senha errados!")
        }

        //Aqui vai a logica do token
        const token = jwt.sign(
                {userId: existingUser.id},
                process.env.JWT_SECRET as string,
                { expiresIn: "1h"}
        )

        return { token }
}

export async function  deleteUserService(userId: string, adminId: string) {
        
        const verifyAdmin = verifyAdminID(adminId)

        if(!verifyAdmin){
                throw new Error("Apenas usuários autorizados podem realizar esta ação.")
        }

        const verifyUser = verifyUserID(userId)

        if(!verifyUser){
                throw new Error("Este usuário não pode ser deletado.")
        }

        return deleteUserRepository(userId)
}

export async function patchUserService(idUser: string, newDataUser: User) {

    if (!idUser) {
        throw new Error("ID do usuário não informado")
    }

    if (!newDataUser) {
        throw new Error("Nenhum dado para atualizar")
    }

    const userExist = await verifyUserID(idUser)

    if (!userExist.exists) {
        throw new Error("Usuário não encontrado")
    }

    const userUpdated = await patchUserRepository(idUser, newDataUser)

    return userUpdated
}