// deno-lint-ignore-file
import { assert, assertEquals, assertExists} from "https://deno.land/std@0.103.0/testing/asserts.ts";

import {
    create_comment,
    delete_comment,
    search_comments,
    update_comment,
} from "../src/service/comment.service.ts"
import { search_elos } from "../src/service/elo.service.ts";


Deno.test("Deveria criar comentários em um elo", async () => {

    const { elos } = await search_elos(
        {
        address: "%Almirante%",
        qtd_comments: 0,
        qtd_likes: 0,
        category: "caro",
        description: "%%",
    },0)


    const {error,status} = await create_comment({
        content: "Meu deus <3",
        id_elo: elos[0].id,
        id_user: 2,
    })
    assertEquals(error,false)
    assertEquals(status,200)
})

Deno.test("Deveria procurar por comentários de um elo", async () => {

    const { elos } = await search_elos(
        {
        address: "%Almirante%",
        qtd_comments: 0,
        qtd_likes: 0,
        category: "caro",
        description: "%%",
    },0)


    const {comments,error,status} = await search_comments({
        id_elo: elos[0].id,
    },0)

    assertEquals(error,false)
    assertEquals(status,200)
    assert(comments.length > 0)
})

Deno.test("Deveria atualizar comentário de um elo", async () => {

    const {error,status} = await update_comment({
        content: "Meu deus <3",
        id_elo: 2,
        id_user: 2,
        id: 3
    })
    assertEquals(error,false)
    assertEquals(status,200)
})
Deno.test("Deveria excluir comentário de um elo", async () => {
    const {error,status} = await delete_comment({
        content: "Meu deus <3",
        id_elo: 2,
        id_user: 2,
        id: 3
    })
    assertEquals(error,false)
    assertEquals(status,200)

})
