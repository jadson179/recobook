// deno-lint-ignore-file
import { assert, assertEquals, assertExists} from "https://deno.land/std@0.103.0/testing/asserts.ts";

import {
    create_elo,
    update_elo,
    delete_elo_by_id,
    find_elo_by_id,
    search_elos
} from '../src/service/elo.service.ts'

Deno.test("Deveria criar um elo", async () => {
    
    const { error,message } = await create_elo({
        address:  "Almirante Carlos da Silveira Carneiro, 394",
        category: "caro",
        description: ":)",
        id_user: 2
    })

    await create_elo({
        address:  "Almirante Carlos da Silveira Carneiro, 394",
        category: "caro",
        description: ":)",
        id_user: 2
    })

    assertEquals<boolean>(error,false)

});

Deno.test("Deveria encontrar um elo por id", async () => {

    const { elos } = await search_elos(
        {
        address: "%Almirante%",
        qtd_comments: 0,
        qtd_likes: 0,
        category: "caro",
        description: "%%",
        },
        0
    )
    
    const { error, elo } = await find_elo_by_id({
        id: elos[0].id
    })

    assertExists(elo)
    assertEquals<boolean>(error,false)

});

Deno.test("Deveria pesquisar um elo pela busca ", async () => {
    
    const { error, elos,message } = await search_elos(
        {
        address: "%Almirante%",
        qtd_comments: 0,
        qtd_likes: 0,
        category: "caro",
        description: "%%",
        },
        0
    )

    assert(elos.length > 0)
    assertEquals<boolean>(error,false)

});


Deno.test("Deveria atualiza um elo", async () => {

    const { elos } = await search_elos(
        {
        address: "%Almirante%",
        qtd_comments: 0,
        qtd_likes: 0,
        category: "caro",
        description: "%%",
        },
        0
    )

    
    const { error } = await update_elo({
        id: elos[0].id,
        address:  "Almirante Carlos da Silveira Carneiro, 394",
        category: "caro",
        description: ":)",
        id_user: 2
    })

    assertEquals<boolean>(error,false)

});

Deno.test("Deveria excluir um elo", async () => {
    
    const { elos } = await search_elos(
        {
        address: "%Almirante%",
        qtd_comments: 0,
        qtd_likes: 0,
        category: "caro",
        description: "%%",
        },
        0
    )
    
    const { error } = await delete_elo_by_id({
        id: elos[0].id,
        address:  "Almirante Carlos da Silveira Carneiro, 394",
        category: "caro",
        description: ":)",
        id_user: 2
    })

    assertEquals<boolean>(error,false)

});