// deno-lint-ignore-file
import connection from '../database/connection.ts'
import Elo from '../model/elo.model.ts'

import {
    MESSAGE_SUCESS_CREATE_ELO,
    MESSAGE_SUCESS_UPDATE_ELO,
    MESSAGE_INTERNAL_SERVER_ERROR,
    SCHEMA_CREATE_ELO,
    CLIENT_DATABASE_CONFIG,
SCHEMA_UPDATE_ELO,
} from '../const.ts'


export async function create_elo(elo:Elo) {
    try {
    const errors = SCHEMA_CREATE_ELO.validate(elo as any)
    
    if (errors.length > 0) {
            return { error: true, message: errors[0].message, status: 400  }
    }
    
    await connection.connect(CLIENT_DATABASE_CONFIG)
    await connection.execute(`INSERT INTO elos VALUES (NULL,?,?,?,?,?,?);`,[
        elo.description,
        0,
        0,
        elo.category,
        elo.address,
        elo.id_user
    ])
    await connection.close()
    
    return { error: false, message: MESSAGE_SUCESS_CREATE_ELO, status: 201  }

    } catch (error) {
        switch (error.message) {
            default:
                return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, status: 500  }
                break;
        }
    }
}
export async function update_elo(elo:Elo) {
    try {
        const errors = SCHEMA_UPDATE_ELO.validate(elo as any)
        
        if (errors.length > 0) {
                return { error: true, message: errors[0].message, status: 400  }
        }
        
        await connection.connect(CLIENT_DATABASE_CONFIG)

        await connection.transaction(async (conn)=>{

            const [{qtd_likes}] = await conn.query(`SELECT COUNT(*) as qtd_likes FROM likes WHERE id_elo = ?;`,[elo.id]) as [{qtd_likes: number}]
            const [{qtd_comments}] = await conn.query(`SELECT COUNT(*) as qtd_comments FROM comments WHERE id_elo = ?;`,[elo.id])  as [{qtd_comments: number}]
            
            await conn.execute(`UPDATE elos SET description = ?, qtd_likes = ?, qtd_comments = ?, category = ?, address = ?, id_user = ?  WHERE ID = ? `,[
                elo.description,
                qtd_likes,
                qtd_comments,
                elo.category,
                elo.address,
                elo.id_user,
                elo.id
            ])

        })
        
        await connection.close()
        
        return { error: false, message: MESSAGE_SUCESS_UPDATE_ELO, status: 201  }
    
        } catch (error) {
            console.log(error.message)
            switch (error.message) {
                default:
                    return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, status: 500  }
                    break;
            }
        }
}
export async function delete_elo(elo:Elo) {}