import { Application } from "https://deno.land/x/oak@v8.0.0/mod.ts";

import { SERVER_PORT } from "./const.ts"

import routesAuth from "./routes/auth.route.ts"
import routesUsers from "./routes/user.route.ts"
import routesElos from "./routes/elo.route.ts"
import routesLikes from "./routes/like.route.ts"
import routesImages from "./routes/image.route.ts"

const app = new Application();


app.use(routesAuth.routes())
app.use(routesUsers.routes())
app.use(routesElos.routes())
app.use(routesLikes.routes())
app.use(routesImages.routes())

await app.listen({port: SERVER_PORT});