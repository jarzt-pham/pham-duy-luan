import { Router } from "express";

export interface IEndpoint {
  router: Router;

  initializeRoutes(): void;
}
