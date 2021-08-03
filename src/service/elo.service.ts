// deno-lint-ignore-file
import connection from '../database/connection.ts'
import Elo from '../model/elo.model.ts'

import {
    MESSAGE_SUCESS_CREATE_ELO,
    MESSAGE_INTERNAL_SERVER_ERROR,
    SCHEMA_CREATE_ELO,
    CLIENT_DATABASE_CONFIG,
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
export async function update_elo(elo:Elo) {}
export async function delete_elo(elo:Elo) {}