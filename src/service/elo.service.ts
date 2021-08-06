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
SCHEMA_DELETE_ELO_BY_ID,
MESSAGE_SUCCESS_DELETE_ELO,
SCHEMA_FIND_ELO_BY_ID,
MESSAGE_SUCCESS_IN_FIND_ELO,
MESSAGE_FAILD_IN_FIND_ELO,
SCHEMA_SEARCH_ELOS,
MESSAGE_SUCESS_IN_SEARCH_ELOS,
MESSAGE_FAILD_IN_SEARCH_ELOS,
} from '../const.ts'


export async function create_elo(elo:Elo) {
    try {
    const errors = SCHEMA_CREATE_ELO.validate(elo as any)
    
    if (errors.length > 0) {
            return { error: true, message: errors[0].message, status: 400  }
    }
    
    await connection.connect(CLIENT_DATABASE_CONFIG)
   const {lastInsertId} = await connection.execute(`INSERT INTO elos VALUES (NULL,?,?,?,?,?,?);`,[
        elo.description,
        0,
        0,
        elo.category,
        elo.address,
        elo.id_user
    ])
    await connection.close()
    
    return { error: false, message: MESSAGE_SUCESS_CREATE_ELO, id: lastInsertId, status: 201  }

    } catch (error) {
        switch (error.message) {
            default:
                return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, id: undefined , status: 500  }
                break;
        }
    }
}
export async function search_elos(elo:Elo,offset:number) {
    try {
 
     const errors = SCHEMA_SEARCH_ELOS.validate(elo as any)
     
     if (errors.length > 0) {
         return { error: true, message: errors[0].message, elos: [], status: 400  }
     }
     
    await connection.connect(CLIENT_DATABASE_CONFIG)
    const elos: Elo[] = await connection.query(`
    SELECT
        id,
        description,
        qtd_likes,
        qtd_comments,
        category,
        address,
        id_user 
    FROM elos 
    WHERE 
        address LIKE ? AND
        category = ? AND 
        description LIKE ? AND 
        qtd_likes >= ? AND 
        qtd_comments >= ?
    ORDER BY id DESC
    LIMIT 5
    OFFSET ?
    `,
    [ 
        elo.address,
        elo.category,
        elo.description,
        elo.qtd_likes,
        elo.qtd_comments,
        offset
    ]
    )
    await connection.close()
    
    if (elos.length == 0) return { error: true, message: MESSAGE_FAILD_IN_SEARCH_ELOS, elos: [], status: 400  }
     
    return { error: false, message: MESSAGE_SUCESS_IN_SEARCH_ELOS, elos: elos, status: 200  }
    
    } catch (error) {
        
         switch (error.message) {
             default:
                 return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, elos: [], status: 500  }
                 break;
        }         
    }
     
 }

export async function find_elo_by_id(elo:Elo) {
    try {
 
     const errors = SCHEMA_FIND_ELO_BY_ID.validate(elo as any)
     
     if (errors.length > 0) {
         return { error: true, message: errors[0].message, elo: null, status: 400  }
     }
     
    await connection.connect(CLIENT_DATABASE_CONFIG)
    const elos: Elo[] = await connection.query(`SELECT id,description,qtd_likes,qtd_comments,category,address,id_user FROM elos WHERE id = ? LIMIT 1`,[ elo.id ])
    await connection.close()
    
    if (elos.length == 0) return { error: true, message: MESSAGE_FAILD_IN_FIND_ELO, elo: null, status: 400  }
     
    return { error: false, message: MESSAGE_SUCCESS_IN_FIND_ELO, elo: elos[0], status: 201  }
    
    } catch (error) {
         switch (error.message) {
             default:
                 return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, elo: null, status: 500  }
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
            switch (error.message) {
                default:
                    return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, status: 500  }
                    break;
            }
        }
}
export async function delete_elo_by_id(elo:Elo) {
    try {

        const errors = SCHEMA_DELETE_ELO_BY_ID.validate(elo as any)
    
        if (errors.length > 0) {
            return { error: true, message: errors[0].message, status: 400  }
        }
        await connection.connect(CLIENT_DATABASE_CONFIG)
        await connection.execute(`DELETE FROM elos WHERE id = ? AND id_user = ? ;`,[
            elo.id,
            elo.id_user
        ])
        await connection.close()
        return { error: false, message: MESSAGE_SUCCESS_DELETE_ELO, status: 200  }
       
    } catch (error) {
        switch (error.message) {
            default:
                return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, status: 500  }
                break;
        }
    }

}