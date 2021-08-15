// deno-lint-ignore-file
import { assert, assertEquals, assertExists} from "https://deno.land/std@0.103.0/testing/asserts.ts";

import {
    create_comment,
    delete_comment,
    search_comments,
    update_comment,
} from "../src/service/comment.service.ts"

Deno.test("Deveria procurar por comentários de um elo", async () => {
    const {comments,error,status} = await search_comments({
        id_elo: 2,
    },0)

    assertEquals(error,false)
    assertEquals(status,200)
    assert(comments.length > 0)
})
Deno.test("Deveria criar comentários em um elo", async () => {

    const {error,status,message} = await create_comment({
        content: "Meu deus <3",
        id_elo: 2,
        id_user: 2,
    })
    assertEquals(error,false)
    assertEquals(status,200)
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
