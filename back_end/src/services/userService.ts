import { findAllUsersRepository } from "../repository/userRepository";

// return all users in DB
export async function getUsersServices(){
        return await findAllUsersRepository();
}