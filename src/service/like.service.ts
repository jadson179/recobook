
// deno-lint-ignore-file
import connection from '../database/connection.ts'

import  Like from '../model/like.model.ts'

import {
    SCHEMA_CREATE_LIKE_IN_ELO,
    MESSAGE_SUCESS_CREATE_LIKE_IN_ELO,
    SCHEMA_QUERY_LIKE_IN_ELO,
    MESSAGE_INTERNAL_SERVER_ERROR,
    CLIENT_DATABASE_CONFIG,
    MESSAGE_SUCESS_FIND_LIKE_IN_ELO,
    MESSAGE_FAILD_FIND_LIKE_IN_ELO
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
            await conn.execute(`UPDATE elos SET qtd_likes = ? WHERE id = ? `,[
                qtd_likes,
                like.id_elo
            ])
            

        }else {
            await connection.execute(`DELETE FROM likes WHERE id_elo = ? AND id_user = ? `,[
                like.id_elo,
                like.id_user
            ])
            
            
            await conn.execute(`UPDATE elos SET qtd_likes = ? WHERE id = ? `,[
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
export async function find_like_in_elo(like:Like) {
    try {
       const errors = SCHEMA_QUERY_LIKE_IN_ELO.validate(like as any)
   
       if (errors.length > 0) {
           return { error: true, message: errors[0].message, likes: [], status: 400 }
       }
   
       await connection.connect(CLIENT_DATABASE_CONFIG)
       const likes: Like[] = await connection.query(`SELECT id,id_elo,id_user FROM likes WHERE id_elo = ? AND id_user = ? `,[like.id_elo,like.id_user])
       await connection.close()
   
       if(likes.length === 0){
        return { error: false, message: MESSAGE_FAILD_FIND_LIKE_IN_ELO, likes: [], status: 404 }
       }

       return { error: false, message: MESSAGE_SUCESS_FIND_LIKE_IN_ELO, likes: likes, status: 200 }
   
    } catch (error) {
       switch (error.message) {
           default:
               return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, likes: [],  status: 500  }
               break;
       }
        
    }   
   }