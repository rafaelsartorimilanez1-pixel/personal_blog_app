import {pool} from '../database/dataConfig'

export async function getAllPostsRepository() {
    
    const result = await pool.query('SELECT * FROM posts')

    return result.rows

}