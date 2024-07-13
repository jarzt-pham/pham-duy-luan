import knex, { Knex } from "knex";
import { Configuration } from "../../config";
import { IDbClient } from "./db.client";

export class PgInstance implements IDbClient {
  config: Knex.Config;

  constructor() {
    this.config = {
      client: "pg",
      connection: {
        host: Configuration.DATABASE_HOST,
        user: Configuration.DATABASE_USER,
        password: Configuration.DATABASE_PASS,
        database: Configuration.DATABASE_NAME,
        port: Configuration.DATABASE_PORT,
      },
    };
  }

  getClient(): Knex {
    return knex(this.config);
  }
}
