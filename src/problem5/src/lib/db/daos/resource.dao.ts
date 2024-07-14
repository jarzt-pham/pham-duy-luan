import { Knex } from "knex";
import { IDbClient } from "../client/db.client";
import {
  FilteringConvertHelperDb,
  WhereFilter,
} from "./helpers/filtering-convert.helper.db";

export type OrderOrdinal = "asc" | "desc";

export interface ResourcesDto {
  id: string;
  name: string;
  description: string;
}
export type ResourceOrderBy = "id" | "name" | "description";

export class ResourcesDao {
  dbClient: Knex;
  constructor(dbClient: IDbClient) {
    this.dbClient = dbClient.getClient();
  }

  async findAll(
    {
      limit = 10,
      offset = 0,
      orderBy = "id",
      orderOrdinal,
    }: {
      limit: number;
      offset: number;
      orderBy: ResourceOrderBy;
      orderOrdinal: OrderOrdinal;
    },
    filter?: {
      where: WhereFilter;
    }
  ) {
    const query = this.dbClient
      .select("*")
      .from("resource")
      .limit(limit)
      .offset(offset)
      .orderBy(orderBy, orderOrdinal);
    if (filter)
      FilteringConvertHelperDb.convertToDbFilter({
        where: filter.where,
        coreQuery: query,
        table: "resource",
      });

    return query;
  }

  async findOne(filter: { where: WhereFilter }) {
    const query = this.dbClient.select("*").from("resource").first();
    FilteringConvertHelperDb.convertToDbFilter({
      where: filter.where,
      coreQuery: query,
      table: "resource",
    });

    return query;
  }

  async create(resource: { id: string; name: string; description: string }) {
    console.log("Creating resource...");
    return this.dbClient.insert(resource).into("resource");
  }

  async update(resource: { id: string; name?: string; description?: string }) {
    return this.dbClient
      .update(resource)
      .from("resource")
      .where("id", resource.id);
  }

  async delete(id: string) {
    return this.dbClient.from("resource").where("id", id).del();
  }
}
