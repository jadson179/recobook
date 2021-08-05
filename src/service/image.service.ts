// deno-lint-ignore-file
import connection from '../database/connection.ts'

import  Image from '../model/image.model.ts'

import {
    SCHEMA_CREATE_IMAGE,
    CLIENT_DATABASE_CONFIG,
    MESSAGE_INTERNAL_SERVER_ERROR,
    MESSAGE_SUCESS_CREATE_IMAGE,
    SCHEMA_SEARCH_IMAGES_IN_ELO,
    MESSAGE_FAILD_SEARCH_IMAGE,
    MESSAGE_SUCESS_SEARCH_IMAGE
} from '../const.ts'


export async function create_image(image:Image) {
    try {
        const errors = SCHEMA_CREATE_IMAGE.validate(image as any)

        if (errors.length > 0) {
            return { error: true, message: errors[0].message, status: 400  }
        }

        await connection.connect(CLIENT_DATABASE_CONFIG)

        
        await connection.execute(`INSERT INTO images VALUES (NULL,?,?);`,[
            image.url,
            image.id_elo
        ])
        await connection.close()

        return { error: false, message: MESSAGE_SUCESS_CREATE_IMAGE, status: 201  }

    } catch (error) {
        switch (error.message) {
            default:
                return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, status: 500  }
                break;
        }
    }
}

export async function search_images(image:Image) {
    try {
 
     const errors = SCHEMA_SEARCH_IMAGES_IN_ELO.validate(image as any)
     
     if (errors.length > 0) {
         return { error: true, message: errors[0].message, images: [], status: 400  }
     }
     
    await connection.connect(CLIENT_DATABASE_CONFIG)
    const images: Image[] = await connection.query(`
    SELECT
        id,
        url,
        id_elo
    FROM images 
    WHERE 
        id_elo = ? 
    ORDER BY id ASC
    `,
    [ 
        image.id_elo,
    ]
    )
    await connection.close()
    
    if (images.length == 0) return { error: true, message: MESSAGE_FAILD_SEARCH_IMAGE, images: [], status: 400  }
     
    return { error: false, message: MESSAGE_SUCESS_SEARCH_IMAGE, images: images, status: 200  }
    
    } catch (error) {
        
         switch (error.message) {
             default:
                 return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, images: [], status: 500  }
                 break;
        }         
    }
     
 }