import express, { Application } from "express";
import { MiddlewareFactory } from "../middlewares/middleware.factory";
import { IEndpoint } from "./app.interface";

export class AppService {
  public static basePathApi = "/api";
  public port: number;
  public app: Application;

  constructor(appSetting: { port: number }, ...endpoints: IEndpoint[]) {
    this.port = appSetting.port ?? 3000;
    this.app = express();

    //initializing middlewares and routes
    this.initializeMiddlewares();
    this.initializeRoutes(...endpoints);
    this.initializeErrorHandling();

    //starting app
    this.startingApp();
  }

  public startingApp() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(MiddlewareFactory.logger);
  }

  private initializeErrorHandling() {
    this.app.use(MiddlewareFactory.errorHandler);
  }

  private initializeRoutes(...endpoints: IEndpoint[]) {
    endpoints.forEach((endpoint) => {
      this.app.use(AppService.basePathApi, endpoint.router);
    });
  }
}
