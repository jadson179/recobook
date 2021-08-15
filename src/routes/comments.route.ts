// deno-lint-ignore-file

import { Router } from 'https://deno.land/x/oak@v8.0.0/mod.ts'
import { MESSAGE_UNAUTHORIZED } from "../const.ts";

import Comment from  '../model/comment.model.ts'

import {
    create_comment,
    delete_comment,
    search_comments,
    update_comment
} from '../service/comment.service.ts'
import { Payload } from "../types.ts";
import { verifyToken } from "../utils/token.ts";


const routes = new Router()

routes.post('/comment',async ({request,response})=>{
   try {
    const payload = await verifyToken(
        request.headers.get('authorization') as string
    ) as unknown as Payload
    
    const comment = await request.body().value as Comment

    if(payload.data.id != comment.id_user) throw new Error(MESSAGE_UNAUTHORIZED);

    const  {error,message,status} = await create_comment(comment)

    response.status = status
    response.body = {
        error,
        message
    }
   } catch (error) {
    response.status = 401
    response.body = {error: true,message: error.message}
   }
})

routes.get('/comments',async ({request,response})=>{
    try {
        await verifyToken(
            request.headers.get('authorization') as string
        ) as unknown as Payload

        const id_elo = request.url.searchParams.get("id_elo")
        const offset = request.url.searchParams.get("offset")
        const {error,message,status,comments} = await search_comments({id_elo: Number(id_elo)},Number(offset))

        response.status = status
        response.body = {error,message,comments}
    } catch (error) {
        response.status = 401
        response.body = {error: true,message: error.message,comments: []}
    }
})

routes.put('/comment',async ({request,response})=>{
    try {
        const payload = await verifyToken(
            request.headers.get('authorization') as string
        ) as unknown as Payload
        
        const comment = await request.body().value as Comment
    
        if(payload.data.id != comment.id_user) throw new Error(MESSAGE_UNAUTHORIZED);
    
        const  {error,message,status} = await update_comment(comment)
    
        response.status = status
        response.body = {
            error,
            message
        }
       } catch (error) {
        response.status = 401
        response.body = {error: true,message: error.message}
       }
})

routes.delete('/comment',async ({request,response})=>{
    try {
        const payload = await verifyToken(
            request.headers.get('authorization') as string
        ) as unknown as Payload
        
        const comment = await request.body().value as Comment
    
        if(payload.data.id != comment.id_user) throw new Error(MESSAGE_UNAUTHORIZED);
    
        const  {error,message,status} = await delete_comment(comment)
    
        response.status = status
        response.body = {
            error,
            message
        }
       } catch (error) {
        response.status = 401
        response.body = {error: true,message: error.message}
       }
})



export default routes