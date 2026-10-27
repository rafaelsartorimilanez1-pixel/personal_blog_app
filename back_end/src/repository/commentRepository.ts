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

export async function getAllCommentsInPostRepository(id: string) {
  const result = await pool.query(
    `
      SELECT
        comments.*,
        users.name AS user_name
      FROM comments
      LEFT JOIN users
        ON comments.user_id = users.id
      WHERE comments.post_id = $1
      ORDER BY comments.created_at ASC
    `,
    [id]
  );

  return result.rows;
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

export async function deleteCommentRepository(id:string) {
    
    const result = await pool.query(
        `
            DELETE FROM comments
            WHERE id = $1
            RETURNING *  
        `, [id]
    )

    return result.rows[0]
}