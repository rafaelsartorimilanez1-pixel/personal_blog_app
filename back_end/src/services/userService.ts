import bcrypt from 'bcrypt'

import { CreateUserRepository, findUserByEmail } from "../repository/userRepository";
import type { User } from '../interface/userInterface';



export async function createUserService(data:User){

        const {name, email, password} = data

        if(!name || !email || !password){
                throw new Error("Preencha os dados corretamente")
        } 

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

        //Aqui vai a logica do token
}