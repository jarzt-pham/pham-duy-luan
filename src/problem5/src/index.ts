import { ResourcesEndpoint } from "./endpoints";
import { AppService, Configuration, PgInstance } from "./lib";

// create a new instance of the database client
const dbClient = new PgInstance();

//create and start app
new AppService(
  { port: Configuration.APPLICATION_PORT },
  new ResourcesEndpoint(dbClient)
);
