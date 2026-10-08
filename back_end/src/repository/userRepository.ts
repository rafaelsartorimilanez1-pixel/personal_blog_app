import {pool} from '../database/dataConfig'
import { randomUUID } from 'node:crypto'
import type { User } from '../interface/userInterface'


export async function findUserByEmail(email: string){
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`
        , [email])

    return result.rows[0]
}

export async function verifyUserID(user_id: string) {
    const result = await pool.query(
         `
         SELECT EXISTS (
             SELECT 1
             FROM users
            WHERE id = $1
         );
         `,
         [user_id]
     )

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

export async function deleteUserRepository(userId: string) {
    const result = await pool.query(
        `
        DELETE FROM users
        WHERE id = $1
        RETURNING *
        `,
        [userId]
    )

    return result.rows[0]
}

export async function patchUserRepository(
    idUser: string,
    newDataUser: User
) {
    const { name, email, password } = newDataUser

    const result = await pool.query(
        `
        UPDATE users
        SET
            name = COALESCE($1, name),
            email = COALESCE($2, email),
            password_hash = COALESCE($3, password_hash)
        WHERE id = $4
        RETURNING *
        `,
        [name, email, password, idUser]
    )

    return result.rows[0]
}