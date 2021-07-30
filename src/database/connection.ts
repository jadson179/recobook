import { Client } from 'https://deno.land/x/mysql@v2.9.0/mod.ts';

import { DATABASE_HOST, DATABASE_USERNAME, DATABASE_PORT, DATABASE_NAME, DATABASE_PASSWORD } from "../const.ts";

export const connection = await new Client().connect({
  hostname: DATABASE_HOST,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  db: DATABASE_NAME,
  port: DATABASE_PORT
});

export default connection



