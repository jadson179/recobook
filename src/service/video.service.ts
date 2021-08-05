// deno-lint-ignore-file
import connection from '../database/connection.ts'

import  Video from '../model/video.model.ts'

import {
    SCHEMA_CREATE_VIDEO,
    CLIENT_DATABASE_CONFIG,
    MESSAGE_INTERNAL_SERVER_ERROR,
    MESSAGE_SUCESS_CREATE_VIDEO,
    SCHEMA_SEARCH_VIDEOS_IN_ELO,
    MESSAGE_FAILD_SEARCH_VIDEO,
    MESSAGE_SUCESS_SEARCH_VIDEO
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

export async function search_videos(video:Video) {
    try {
 
     const errors = SCHEMA_SEARCH_VIDEOS_IN_ELO.validate(video as any)
     
     if (errors.length > 0) {
         return { error: true, message: errors[0].message, videos: [], status: 400  }
     }
     
    await connection.connect(CLIENT_DATABASE_CONFIG)
    const videos: Video[] = await connection.query(`
    SELECT
        id,
        url,
        id_elo
    FROM videos 
    WHERE 
        id_elo = ? 
    ORDER BY id ASC
    `,
    [ 
        video.id_elo,
    ]
    )
    await connection.close()
    
    if (videos.length == 0) return { error: true, message: MESSAGE_FAILD_SEARCH_VIDEO, videos: [], status: 400  }
     
    return { error: false, message: MESSAGE_SUCESS_SEARCH_VIDEO, videos: videos, status: 200  }
    
    } catch (error) {
        
         switch (error.message) {
             default:
                 return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, videos: [], status: 500  }
                 break;
        }         
    }
     
 }