import { pool } from "../database/dataConfig";

export async function verifyAdminID(id_admin: string) {
    
    const result = await pool.query(
        `
            SELECT EXISTS (
                SELECT 1
                FROM admin
                WHERE user_id = $1
            );
        `,[id_admin]
    )

  return result.rows[0].exists as boolean;
}
