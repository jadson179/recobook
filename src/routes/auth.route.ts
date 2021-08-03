// deno-lint-ignore-file

import { Router } from 'https://deno.land/x/oak@v8.0.0/mod.ts'

import User from  '../model/user.model.ts'

import {
    find_user_by_username_and_password
} from '../service/user.service.ts'
import {createToken} from '../utils/token.ts'


const routes = new Router()

routes.post('/auth',async ({request,response})=>{
    const userData = await request.body().value as User
    const  {error,message,status,user} = await find_user_by_username_and_password(userData)
    let  token = ""

    if (user)
        token = await createToken<User>(user,"user")

    response.status = status
    response.body = {
        error,
        message,
        user,
        token
    }
})

export default routes