// deno-lint-ignore-file
import { assertEquals} from "https://deno.land/std@0.103.0/testing/asserts.ts";

import {
    register_like_in_elo
} from '../src/service/like.service.ts'

Deno.test("Deveria registrar um like no elo 2", async () => {
    
    const { error,message,status } = await register_like_in_elo({
        id_user: 2,
        id_elo: 2
    })

    assertEquals(status,200)
    assertEquals<boolean>(error,false)

});