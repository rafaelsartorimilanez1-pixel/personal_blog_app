import {pool} from '../database/dataConfig'

export async function findAllUsersRepository(){
    const result = await pool.query('SELECT * FROM users')

    return result.rows
}