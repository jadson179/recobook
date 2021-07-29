import { Application } from "https://deno.land/x/oak@v7.5.0/mod.ts";

import { SERVER_PORT } from "./const.ts"

const app = new Application();

await app.listen({port: SERVER_PORT});