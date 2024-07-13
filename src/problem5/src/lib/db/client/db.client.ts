import { Knex } from "knex";

export interface IDbClient {
  config: Knex.Config;
  getClient(config?: Knex.Config): Knex;
}
