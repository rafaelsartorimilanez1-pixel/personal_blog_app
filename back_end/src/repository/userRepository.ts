import {pool} from '../database/dataConfig'
import { randomUUID } from 'node:crypto'
import type { User } from '../interface/userInterface'

export async function findUserByEmail(email: string){
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`
        , [email])

    return result.rows[0]
}

export async function CreateUserRepository(data:User) {
    const post = await pool.query(
        `
            INSERT INTO users(id, name, email, password_hash)
            VALUES ( $1, $2, $3, $4)
            RETURNING id, name, email, created_at
        `,[
            randomUUID(),
            data.name,
            data.email,
            data.password
        ]
    );

    return post.rows[0]
}