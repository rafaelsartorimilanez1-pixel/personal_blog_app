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