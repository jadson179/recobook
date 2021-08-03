// deno-lint-ignore-file

import { Router } from 'https://deno.land/x/oak@v8.0.0/mod.ts'
import { MESSAGE_UNAUTHORIZED } from "../const.ts";
import Elo from "../model/elo.model.ts";

import {create_elo,update_elo,delete_elo_by_id} from '../service/elo.service.ts'
import { Payload } from "../types.ts";
import { verifyToken } from "../utils/token.ts";

const routes = new Router()



routes.post("/elo", async ({request,response})=>{
    try {
        const payload = await verifyToken(
            request.headers.get('authorization') as string
        ) as unknown as Payload
        
        const elo = await request.body().value as Elo

        if(payload.data.id != elo.id_user) throw new Error(MESSAGE_UNAUTHORIZED);

        const {error,message,status,id} = await create_elo(elo)

        response.status = status
        response.body = {error,message,id}
    } catch (error) {
        response.status = 401
        response.body = {error: true,message: error.message}
    }    

})

routes.put("/elo/:id",async ({request,response,params})=>{
    try {
        const payload = await verifyToken(
            request.headers.get('authorization') as string
        ) as unknown as Payload
        
        const elo = await request.body().value as Elo
        const id = Number(params.id)

        if(payload.data.id != elo.id_user) throw new Error(MESSAGE_UNAUTHORIZED);

        elo.id = id
        const {error,message,status} = await update_elo(elo)

        response.status = status
        response.body = {error,message}
    } catch (error) {
        response.status = 401
        response.body = {error: true,message: error.message}
    }    
})
routes.delete("/elo/:id", async ({request,response,params})=>{
    try {
        const payload = await verifyToken(
            request.headers.get('authorization') as string
        ) as unknown as Payload
        
        const elo = await request.body().value as Elo
        const id = Number(params.id)

        if(payload.data.id != elo.id_user) throw new Error(MESSAGE_UNAUTHORIZED);

        elo.id = id
        const {error,message,status} = await delete_elo_by_id(elo)

        response.status = status
        response.body = {error,message}
    } catch (error) {
        response.status = 401
        response.body = {error: true,message: error.message}
    }    
})

export default routes