// deno-lint-ignore-file

import { Router } from 'https://deno.land/x/oak@v8.0.0/mod.ts'
import { MESSAGE_UNAUTHORIZED } from "../const.ts";
import { Payload } from "../types.ts";
import { verifyToken } from "../utils/token.ts";

import {create_image,search_images} from '../service/image.service.ts'
import {find_elo_by_id} from '../service/elo.service.ts'
import Image from "../model/image.model.ts";


const routes = new Router()

routes.post("/image", async ({request,response})=>{
    try {
        const payload  = await verifyToken(
            request.headers.get('authorization') as string
        ) as unknown as Payload
        
        const image:Image  = await request.body().value as Image

        const { elo } =  await find_elo_by_id({id: image.id_elo})

        if(payload.data.id != elo?.id_user) throw new Error(MESSAGE_UNAUTHORIZED);

        const {error,message,status} = await create_image(image)

        response.status = status
        response.body = {error,message}
    } catch (error) {
        response.status = 401
        response.body = {error: true,message: error.message}
    }
})
routes.get("/images", async ({request,response})=>{
    try {
        await verifyToken(
            request.headers.get('authorization') as string
        ) as unknown as Payload

        const id_elo = request.url.searchParams.get("id_elo")

        const {error,message,status,images} = await search_images({id_elo: Number(id_elo)})

        response.status = status
        response.body = {error,message,images}
    } catch (error) {
        response.status = 401
        response.body = {error: true,message: error.message}
    }

})


export default routes