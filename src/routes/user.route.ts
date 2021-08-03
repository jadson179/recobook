// deno-lint-ignore-file

import { Router } from 'https://deno.land/x/oak@v8.0.0/mod.ts'
import { MESSAGE_UNAUTHORIZED } from "../const.ts";

import User from  '../model/user.model.ts'

import {
    create_user,
    update_user,
    delete_user_by_id
} from '../service/user.service.ts'
import { Payload } from "../types.ts";
import {verifyToken} from '../utils/token.ts'


const routes = new Router()

routes.post('/user',async ({request,response})=>{
    const user = await request.body().value as User
    const  {error,message,status} = await create_user(user)
    response.status = status
    response.body = {error,message}
})

routes.put('/user/:id',async ({request,response,params})=>{

    try {
        
        const payload = await verifyToken(
            request.headers.get('authorization') as string
        ) as unknown as Payload
        
        const user = await request.body().value as User
        const id = Number(params.id) 
        
        if(payload.data.id != id) throw new Error(MESSAGE_UNAUTHORIZED);
    
        user.id = id
        
        console.log(user)
        const  {error,message,status} = await update_user(user)
        
        response.status = status
        response.body = {error,message}

    } catch (error) {
        response.status = 401
        response.body = {error: true,message: error.message}
        
    }
})
routes.delete('/user/:id', async ({request,response,params})=>{
    try {
        
        const payload = await verifyToken(
            request.headers.get('authorization') as string
        ) as unknown as Payload
        
        const user = payload.data
        
        const id = Number(params.id) 
        
        if(payload.data.id != id) throw new Error(MESSAGE_UNAUTHORIZED);
    
        user.id = id
        
        const  {error,message,status} = await delete_user_by_id(user)
        
        response.status = status
        response.body = {error,message}

    } catch (error) {
        response.status = 401
        response.body = {error: true,message: error.message}
        
    }

})


export default routes