import { Knex } from "knex";

export type WhereFilter = { [key: string]: string };

export class FilteringConvertHelperDb {
  static convertToDbFilter({
    where,
    coreQuery,
    table,
  }: {
    where: WhereFilter;
    coreQuery: Knex.QueryBuilder;
    table: string;
  }) {
    const [key, value] = Object.entries(where)[0];

    switch (table) {
      case "resource": {
        FilteringConvertHelperDb.convertResourceToClause({
          field: key,
          value,
          coreQuery,
        });
        break;
      }

      default:
        throw new Error(`Unsupported field: ${table}`);
    }
  }

  static convertResourceToClause({
    field,
    value,
    coreQuery,
  }: {
    field: string;
    value: string;
    coreQuery: Knex.QueryBuilder;
  }) {
    switch (field) {
      case "id": {
        coreQuery.where(`id`, value);
        break;
      }
      case "name": {
        coreQuery.where(`name`, value);
        break;
      }
      case "description": {
        coreQuery.where(`description`, value);
        break;
      }
      default: {
        throw new Error(`Unsupported field: ${field}`);
      }
    }
  }
}
