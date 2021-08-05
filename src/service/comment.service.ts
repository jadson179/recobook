// deno-lint-ignore-file
import connection from '../database/connection.ts'

import Comment from '../model/comment.model.ts'

import {
    SCHEMA_CREATE_COMMENT_IN_ELO,
    SCHEMA_DELETE_COMMENT_IN_ELO,
    SCHEMA_UPDATE_COMMENT_IN_ELO,
    MESSAGE_SUCESS_CREATE_COMMENT_IN_ELO,
    MESSAGE_SUCESS_UPDATE_COMMENT_IN_ELO,
    MESSAGE_SUCESS_DELETE_COMMENT_IN_ELO,
    MESSAGE_INTERNAL_SERVER_ERROR,
    CLIENT_DATABASE_CONFIG,
} from '../const.ts'

export async function create_comment(comment:Comment){
    try {

        const errors = SCHEMA_CREATE_COMMENT_IN_ELO.validate(comment as any)

        if (errors.length > 0) {
            return { error: true, message: errors[0].message, status: 400  }
        }
        
        await connection.connect(CLIENT_DATABASE_CONFIG)
        await connection.transaction(async (conn)=>{

            
            await conn.execute(`INSERT INTO comments VALUES (NULL,?,?,?);`,[
                comment.content,
                comment.id_elo,
                comment.id_user
            ])
            
            const [{qtd_comments}] = await conn.query(`SELECT COUNT(*) as qtd_comments FROM comments WHERE id_elo = ?;`,[comment.id_elo]) as [{qtd_comments: number}]
            
            await conn.execute(`UPDATE elos SET qtd_comments = ? WHERE id = ? `,[
                qtd_comments,
                comment.id_elo
            ])
           
    
        })
        await connection.close()

        return { error: false, message: MESSAGE_SUCESS_CREATE_COMMENT_IN_ELO, status: 200 }

    } catch (error) {
        switch (error.message) {
            default:
                return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, status: 500  }
                break;
        }
    }
}

export async function update_comment(comment:Comment){
    try {

        const errors = SCHEMA_UPDATE_COMMENT_IN_ELO.validate(comment as any)

        if (errors.length > 0) {
            return { error: true, message: errors[0].message, status: 400  }
        }
        
        await connection.connect(CLIENT_DATABASE_CONFIG)
        await connection.execute(`UPDATE comments SET content = ? WHERE id = ? AND id_user = ? `,[
            comment.content,
            comment.id_elo,
            comment.id_user
        ])
        await connection.close()

        return { error: false, message: MESSAGE_SUCESS_UPDATE_COMMENT_IN_ELO, status: 200 }

    } catch (error) {
        switch (error.message) {
            default:
                return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, status: 500  }
                break;
        }
    }
}
export async function delete_comment(comment:Comment){
    try {

        const errors = SCHEMA_DELETE_COMMENT_IN_ELO.validate(comment as any)

        if (errors.length > 0) {
            return { error: true, message: errors[0].message, status: 400  }
        }
        
        await connection.connect(CLIENT_DATABASE_CONFIG)
        await connection.transaction(async (conn)=>{

            
            await conn.execute(`DELETE FROM comments WHERE id = ? AND id_elo = ? AND id_user = ?;`,[
                comment.id,
                comment.id_elo,
                comment.id_user
            ])
            
            const [{qtd_comments}] = await conn.query(`SELECT COUNT(*) as qtd_comments FROM comments WHERE id_elo = ?;`,[comment.id_elo]) as [{qtd_comments: number}]
            
            await conn.execute(`UPDATE elos SET qtd_comments = ? WHERE id = ? `,[
                qtd_comments,
                comment.id_elo
            ])
           
    
        })
        await connection.close()

        return { error: false, message: MESSAGE_SUCESS_DELETE_COMMENT_IN_ELO, status: 200 }

    } catch (error) {
        switch (error.message) {
            default:
                return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, status: 500  }
                break;
        }
    }
}