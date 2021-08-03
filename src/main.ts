import { Application } from "https://deno.land/x/oak@v8.0.0/mod.ts";

import { SERVER_PORT } from "./const.ts"

import routesAuth from "./routes/auth.route.ts"
import routesUsers from "./routes/user.route.ts"

const app = new Application();


app.use(routesAuth.routes())
app.use(routesUsers.routes())

await app.listen({port: SERVER_PORT});