// deno-lint-ignore-file

import { Router } from 'https://deno.land/x/oak@v8.0.0/mod.ts'
import { MESSAGE_UNAUTHORIZED } from "../const.ts";
import { Payload } from "../types.ts";
import { verifyToken } from "../utils/token.ts";

import {create_video,search_videos} from '../service/video.service.ts'
import {find_elo_by_id} from '../service/elo.service.ts'
import Video from "../model/video.model.ts";


const routes = new Router()

routes.post("/video", async ({request,response})=>{
    try {
        const payload  = await verifyToken(
            request.headers.get('authorization') as string
        ) as unknown as Payload
        
        const video:Video  = await request.body().value as Video

        const { elo } =  await find_elo_by_id({id: video.id_elo})

        if(payload.data.id != elo?.id_user) throw new Error(MESSAGE_UNAUTHORIZED);

        const {error,message,status} = await create_video(video)

        response.status = status
        response.body = {error,message}
    } catch (error) {
        response.status = 401
        response.body = {error: true,message: error.message}
    }
})
routes.get("/videos", async ({request,response})=>{
    try {
        await verifyToken(
            request.headers.get('authorization') as string
        ) as unknown as Payload

        const id_elo = request.url.searchParams.get("id_elo")

        const {error,message,status,videos} = await search_videos({id_elo: Number(id_elo)})

        response.status = status
        response.body = {error,message,videos}
    } catch (error) {
        response.status = 401
        response.body = {error: true,message: error.message}
    }

})


export default routes