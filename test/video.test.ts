// deno-lint-ignore-file
import { assertEquals} from "https://deno.land/std@0.103.0/testing/asserts.ts";

import {
    create_video,
    search_videos
} from '../src/service/video.service.ts'

Deno.test("Deveria adicionar um video no elo 4", async () => {
    
    const { error } = await create_video({
        url: "http://0.0.0.0:1993/video/3585098309583.mp4",
        id_elo: 5
    })
    
    assertEquals<boolean>(error,false)

});

Deno.test("Deveria obter todas as videos vinculados ao elo 4", async () => {
    
    const { error } = await search_videos({
        id_elo: 2
    })
    assertEquals<boolean>(error,false)

});