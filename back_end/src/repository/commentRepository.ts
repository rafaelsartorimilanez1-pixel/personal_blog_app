import {pool} from "../database/dataConfig"
import type { Comment } from "../interface/commentInterface";

export async function newCommentRepository(content: Comment, userId: string, postId: string) {
    
    const result = pool.query(
        `
            INSERT INTO comments (
            user_id,
            post_id,
            content
        ) VALUES (
            $1,
            $2,
            $3
        );
        `,[userId, postId, content]
    )

    return (await result).rows[0]
}

export async function findCommentById(id: string){

    const result = await pool.query(
        `
            SELECT * FROM comments
            WHERE id = $1
        `, [id]
    )

    return result.rows
}

export async function patchCommentRepository(newContent: string, commentId: string){

    const result = await pool.query(
        `
        UPDATE comments
        SET content = $1
        WHERE id = $2
        RETURNING *
        `,
        [newContent, commentId]
    )

    return result.rows[0]
}