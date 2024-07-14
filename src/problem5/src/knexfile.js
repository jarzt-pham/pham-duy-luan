require("ts-node/register");
const path = require("path");
const { Configuration } = require("./lib/config");

module.exports = {
  client: "pg",
  connection: {
    user: Configuration.DATABASE_USER,
    password: Configuration.DATABASE_PASS,
    database: Configuration.DATABASE_NAME,
    port: Configuration.DATABASE_PORT,
  },
  migrations: {
    directory: path.join(__dirname, "lib/db/migrations"),
  },
  seeds: {
    directory: path.join(__dirname, "lib/db/seeds"),
  },
};
