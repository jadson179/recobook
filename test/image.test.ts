// deno-lint-ignore-file
import { assertEquals} from "https://deno.land/std@0.103.0/testing/asserts.ts";

import {
    create_image
} from '../src/service/image.service.ts'

Deno.test("Deveria adicionar uma imagem no elo 4", async () => {
    
    const { error,message } = await create_image({
        url: "http://0.0.0.0:1993/image/jadson.png",
        id_elo: 4
    })
    
    assertEquals<boolean>(error,false)

});