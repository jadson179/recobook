// deno-lint-ignore-file
import { assert, assertEquals} from "https://deno.land/std@0.103.0/testing/asserts.ts";

import {
    register_like_in_elo,
    find_like_in_elo
} from '../src/service/like.service.ts'
import { search_elos } from "../src/service/elo.service.ts";

Deno.test("Deveria registrar um like no elo ", async () => {

    const { elos } = await search_elos(
        {
        address: "%Almirante%",
        qtd_comments: 0,
        qtd_likes: 0,
        category: "caro",
        description: "%%",
    },0)

    const { error,message,status } = await register_like_in_elo({
        id_user: 2,
        id_elo: elos[0].id
    })
    assertEquals(status,200)
    assertEquals<boolean>(error,false)

});
