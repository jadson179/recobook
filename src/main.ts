import { Application } from "https://deno.land/x/oak@v8.0.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import { SERVER_PORT } from "./const.ts"

import routesAuth from "./routes/auth.route.ts"
import routesUsers from "./routes/user.route.ts"
import routesElos from "./routes/elo.route.ts"
import routesLikes from "./routes/like.route.ts"
import routesComments from "./routes/comments.route.ts"
import routesImages from "./routes/image.route.ts"
import routesVideos from "./routes/video.route.ts"

const app = new Application();

app.use(oakCors());

app.use(routesAuth.routes())
app.use(routesUsers.routes())
app.use(routesElos.routes())
app.use(routesLikes.routes())
app.use(routesComments.routes())
app.use(routesImages.routes())
app.use(routesVideos.routes())

await app.listen({port: SERVER_PORT});