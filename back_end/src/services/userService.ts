import bcrypt from 'bcrypt'

import { CreateUserRepository, findAllUsersRepository, findUserByEmail } from "../repository/userRepository";
import type { User } from '../interface/userInterface';

// return all users in DB
export async function getUsersService(){
        return findAllUsersRepository();
}

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