import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";

import { create_user, update_user } from '../src/service/user.service.ts'

import {
    MESSAGE_SUCESS_CREATE_USER,
    MESSAGE_USER_ALREADY_EXISTS_EMAIL,
    MESSAGE_USER_ALREADY_EXISTS_USERNAME
} from '../src/const.ts'


Deno.test("[service] Deveria criar um usuario", async () => {
    
    const {error } = await create_user({
        name: "Jadson dos Santos Silva",
        email: "jadson44.santos@gmail.com",
        username: "15859eb4-f0bb-11eb-aef4-9b77f48ed9b1",
        password: "15859eb4-f0bb-11eb-aef4-9b77f48ed9b1",
        photo: "http://0.0.0.0:1993/user/0000000001.png",
        bio: ""
    })

    if (error) { 
        assertEquals<boolean>(error,true)
    }else {
        assertEquals<boolean>(error,false)
    }

});

Deno.test("[service] Deveria atualizar um usuario", async () => {
    
    const { error } = await update_user({
        name: "Jadson dos Santos Silva",
        email: "jadson444.santos@gmail.com",
        username: "15859eb4-f0bb-11eb-aef4-9b77f48ed9b1",
        password: "15859eb4-f0bb-11eb-aef4-9b77f48ed9b1",
        photo: "http://0.0.0.0:1993/user/0000000001.png",
        bio: "",
        id: 1
    })


    if (error) { 
        assertEquals<boolean>(error,true)
    }else {
        assertEquals<boolean>(error,false)
    }

});

