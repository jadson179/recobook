
// deno-lint-ignore-file
import connection from '../database/connection.ts'

import  Like from '../model/like.model.ts'

import {
    SCHEMA_CREATE_LIKE_IN_ELO,
    MESSAGE_SUCESS_CREATE_LIKE_IN_ELO,
    MESSAGE_INTERNAL_SERVER_ERROR,
    CLIENT_DATABASE_CONFIG
} from '../const.ts'



export async function register_like_in_elo(like:Like) {
 try {
    const errors = SCHEMA_CREATE_LIKE_IN_ELO.validate(like as any)

    if (errors.length > 0) {
        return { error: true, message: errors[0].message, status: 400  }
    }


    await connection.connect(CLIENT_DATABASE_CONFIG)
    await connection.transaction(async (conn)=>{

        const likes: Like[] = await conn.query(`SELECT id,id_elo,id_user FROM likes WHERE id_elo = ? AND id_user = ? `,[like.id_elo,like.id_user]) as Like[]
        const [{qtd_likes}] = await conn.query(`SELECT COUNT(*) as qtd_likes FROM likes WHERE id_elo = ?;`,[like.id_elo]) as [{qtd_likes: number}]

        if(likes.length == 0) {
            await connection.execute(`INSERT INTO likes VALUES (NULL,?,?);`,[
                like.id_elo,
                like.id_user
            ])
            
            await conn.execute(`UPDATE elos SET qtd_likes = ? WHERE ID = ? `,[
                qtd_likes,
                like.id_elo
            ])

        }else {
            await connection.execute(`DELETE FROM likes WHERE id_elo = ? AND id_user = ? `,[
                like.id_elo,
                like.id_user
            ])
            
            
            await conn.execute(`UPDATE elos SET qtd_likes = ? WHERE ID = ? `,[
                qtd_likes,
                like.id_elo
            ])
        }

    })

    await connection.close()

    return { error: false, message: MESSAGE_SUCESS_CREATE_LIKE_IN_ELO, status: 200 }

 } catch (error) {
    switch (error.message) {
        default:
            return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, status: 500  }
            break;
    }
     
 }   
}