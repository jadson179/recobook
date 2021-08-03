import { 
    verify,
    create,
    decode,
    Payload
} from "https://deno.land/x/djwt@v2.2/mod.ts"

import {
    SERVICE_AUTH_KEY
} from '../const.ts'


export async function createToken<T>(data:T,type: "core"|"user") {
    const payload: Payload = {
        data: data,
        type: type,
        exp: Math.floor(Date.now() / 1000) + 3600
    };
      
    return await create({ alg: "HS256", typ: "JWT" },payload, SERVICE_AUTH_KEY)
}

export async function verifyToken(token:string) {
    return await verify(token,SERVICE_AUTH_KEY,"HS256")
}

export function decodeToken(token:string) {
    return decode(token);
}