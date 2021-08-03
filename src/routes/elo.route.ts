// deno-lint-ignore-file

import { Router } from 'https://deno.land/x/oak@v8.0.0/mod.ts'
import { MESSAGE_UNAUTHORIZED } from "../const.ts";
import Elo from "../model/elo.model.ts";

import {create_elo} from '../service/elo.service.ts'
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

routes.put("/elo/:id",()=>{

})
routes.delete("/elo/:id",()=>{})

export default routes