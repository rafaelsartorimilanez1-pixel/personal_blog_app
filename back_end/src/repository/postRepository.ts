import {pool} from '../database/dataConfig'
import type { Post } from '../interface/postInterface'

export async function getAllPostsRepository() {
    
    const result = await pool.query('SELECT * FROM posts')

    return result.rows

}

export async function createPostRepository(data: Post) {

    const {admin_id, content, image_url, title} = data

    const result = await pool.query(
        `
        INSERT INTO posts (admin_id, title, content, image_url) 
            VALUES($1, $2, $3, $4)
            RETURNING *
        `, [admin_id,  title, content, image_url]
    )

    return result.rows[0]
}

export async function findPostById(id: string){

    const result = await pool.query(
        `
            SELECT * FROM posts
            WHERE id = $1
        `, [id]
    )

    return result.rows
}

export async function updatePostRepository(idPost: string, data: Post ){

    const {title, content, image_url} = data

    const result = await pool.query(
        `
            UPDATE posts
            SET
                    title = $1,
                    content = $2,
                    image_url = $3
            WHERE id = $4
            RETURNING *
        `,[title, content, image_url, idPost]
    )

    return result.rows[0]

}