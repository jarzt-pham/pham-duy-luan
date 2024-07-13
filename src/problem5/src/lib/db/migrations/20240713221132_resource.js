exports.up = function (knex) {
  return knex.schema.createTable("resource", function (table) {
    table.uuid("id", ).primary();
    table.string("name", 100).notNullable();
    table.string("description", 1000).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("resource");
};
