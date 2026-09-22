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