// deno-lint-ignore-file
import connection from '../database/connection.ts'

import  Video from '../model/video.model.ts'

import {
    SCHEMA_CREATE_VIDEO,
    CLIENT_DATABASE_CONFIG,
    MESSAGE_INTERNAL_SERVER_ERROR,
    MESSAGE_SUCESS_CREATE_VIDEO
} from '../const.ts'


export async function create_video(video:Video) {
    try {
        const errors = SCHEMA_CREATE_VIDEO.validate(video as any)

        if (errors.length > 0) {
            return { error: true, message: errors[0].message, status: 400  }
        }

        await connection.connect(CLIENT_DATABASE_CONFIG)
        await connection.execute(`INSERT INTO videos VALUES (NULL,?,?);`,[
            video.url,
            video.id_elo
        ])
        await connection.close()

        return { error: false, message: MESSAGE_SUCESS_CREATE_VIDEO, status: 201  }

    } catch (error) {
        switch (error.message) {
            default:
                return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, status: 500  }
                break;
        }
    }
}
