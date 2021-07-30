// deno-lint-ignore-file
import connection from '../database/connection.ts'
import User from '../model/user.model.ts'

import { 
    MESSAGE_SUCESS_CREATE_USER,
    MESSAGE_USER_ALREADY_EXISTS_EMAIL,
    MESSAGE_USER_ALREADY_EXISTS_USERNAME,
    MESSAGE_INTERNAL_SERVER_ERROR
} from "../const.ts";

export async function create_user(user:User) {
   try {

    await connection.execute(`INSERT INTO users VALUES (NULL,?,?,?,?,?,?);`,[
        user.name,
        user.email,
        user.username,
        user.password,
        user.photo,
        user.bio
    ])

    return { error: false, message: MESSAGE_SUCESS_CREATE_USER, status: 200  }
   
    } catch (error) {
        switch (error.message) {
            case `Duplicate entry '${user.email}' for key 'email'`:
                return { error: true, message: MESSAGE_USER_ALREADY_EXISTS_EMAIL, status: 400  }
                break;
            case `Duplicate entry '${user.username}' for key 'username'`:
                return { error: true, message: MESSAGE_USER_ALREADY_EXISTS_USERNAME, status: 400  }
                break;
            default:
                return { error: true, message: MESSAGE_INTERNAL_SERVER_ERROR, status: 500  }
                break;
        }

        
   }
    
}



