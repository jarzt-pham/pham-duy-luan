import { NextFunction, Request, Response, Router } from "express";
import { v4 } from "uuid";

import {
  BadRequestException,
  HttpException,
  IEndpoint,
  InternalServerErrorException,
} from "../lib";
import {
  OrderOrdinal,
  ResourceOrderBy,
  ResourcesDao,
  ResourcesDto,
} from "../lib/db/daos/resource.dao";
import { IDbClient } from "../lib/db/client/db.client";
import { ResponseFactory } from "../lib/communications";

export class ResourcesEndpoint implements IEndpoint {
  router: Router;
  dao: ResourcesDao;

  constructor(dbClient: IDbClient) {
    this.router = Router();
    this.dao = new ResourcesDao(dbClient);

    this.initializeRoutes();
  }

  initializeRoutes(): void {
    //GET
    this.router.get("/resources", (req, res, n) =>
      this.findAllResources(req, res, n)
    );
    this.router.get("/resources/:id", (req, res, n) =>
      this.findOneById(req, res, n)
    );

    //POST
    this.router.post("/resources", (req, res, n) =>
      this.createResource(req, res, n)
    );

    //PUT
    this.router.put("/resources/:id", (req, res, n) =>
      this.updateResource(req, res, n)
    );

    //DELETE
    this.router.delete("/resources/:id", (req, res, n) =>
      this.deleteResource(req, res, n)
    );
  }

  // ******************************************
  // *              GET section               |
  // ******************************************

  /**
   * Find all resources
   * params:
   * - limit: number - default 10 (require: false)
   * - offset: number - default 0 (require: false)
   * - orderBy: string - default "id" (require: false)
   * - order_ordinal: string - default "asc" (require: false)
   * - id: string(require: false)
   * - name: string - default "" (require: false)
   * - description: string - default "" (require: false)
   *
   * API supports filter with id, name and description, but only one filter can be used at a time.
   * If multiple filters are used, the API will prioritize the filter in the order of id, name, and description.
   * Example: /resources?name="name" => Return all resources with the name "name"
   */
  private async findAllResources(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log("Getting all resources...");

    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const orderBy = req.query.orderBy
      ? (req.query.order_by as ResourceOrderBy)
      : ("id" as ResourceOrderBy);
    const orderOrdinal = req.query.order_ordinal
      ? (req.query.order_ordinal as OrderOrdinal)
      : "asc";

    const filterWithField = req.query["id"]
      ? "id"
      : req.query["name"]
      ? "name"
      : req.query["description"]
      ? "description"
      : undefined;

    const filterValue = (req.query["id"] ??
      req.query["name"] ??
      req.query["description"] ??
      "") as string;

    let resources: ResourcesDto[] = [];
    try {
      resources = await this.dao.findAll(
        {
          limit,
          offset,
          orderBy,
          orderOrdinal,
        },
        filterWithField
          ? { where: { [filterWithField]: filterValue } }
          : undefined
      );
    } catch (err) {
      console.error(err);
      return next(new InternalServerErrorException());
    }

    ResponseFactory.make({
      status: 200,
      data: resources,
      response: res,
    });
  }

  /**
   * Find one resource by id
   * params:
   * - id: string (required: true)
   */
  private async findOneById(req: Request, res: Response, next: NextFunction) {
    console.log("Getting one resource...");

    let resource: ResourcesDto = {} as ResourcesDto;
    try {
      const filter = {
        where: {
          id: req.params.id,
        },
      };

      resource = await this.dao.findOne(filter);
      if (!resource)
        return next(
          new HttpException({ status: 404, message: "Resource not found" })
        );
    } catch (err) {
      console.error(err);
      return next(new InternalServerErrorException());
    }

    ResponseFactory.make({
      status: 200,
      data: resource,
      response: res,
    });
  }

  // ******************************************
  // *              POST section              *
  // ******************************************

  /**
   * Create a new resource
   * body:
   * - name: string (required: true)
   * - description: string (required: true)
   */
  private async createResource(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log("Creating resource...");

    if (!req.body.name || !req.body.description)
      return next(
        new HttpException({
          status: 400,
          message: "Name and description are required",
        })
      );

    let resource: ResourcesDto = {} as ResourcesDto;
    try {
      resource = {
        id: v4(),
        name: req.body.name,
        description: req.body.description,
      };

      await this.dao.create(resource);
    } catch (err) {
      console.error(err);
      return next(new InternalServerErrorException());
    }

    ResponseFactory.make({
      status: 201,
      data: resource,
      response: res,
    });
  }

  // ******************************************
  // *              PUT section               *
  // ******************************************

  /**
   * Update a resource
   * params:
   * - id: string (required: true)
   * body:
   * - name: string (required: true)
   * - description: string (required: true)
   */
  private async updateResource(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log("Updating resource...");

    if (!req.body.name || !req.body.description)
      return next(new BadRequestException("Name and description are required"));

    let resource: ResourcesDto = {} as ResourcesDto;
    try {
      resource = {
        id: req.params.id,
        name: req.body.name,
        description: req.body.description,
      };

      const isFound = await this.dao.findOne({ where: { id: resource.id } });
      if (!isFound)
        return next(
          new HttpException({ status: 404, message: "Resource not found" })
        );

      await this.dao.update(resource);
    } catch (err) {
      console.error(err);
      return next(new InternalServerErrorException());
    }

    ResponseFactory.make({
      status: 200,
      data: resource,
      response: res,
    });
  }

  // ******************************************
  // *             DELETE section             *
  // ******************************************

  /**
   * Delete a resource
   * params:
   * - id: string (required: true)
   */
  private async deleteResource(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log("Deleting resource...");

    if (!req.params.id)
      return next(new BadRequestException("Resource id is required"));

    try {
      const isFound = await this.dao.findOne({ where: { id: req.params.id } });
      if (!isFound)
        return next(
          new HttpException({ status: 404, message: "Resource not found" })
        );

      await this.dao.delete(req.params.id);
    } catch (err) {
      console.error(err);
      return next(new InternalServerErrorException());
    }

    ResponseFactory.make({
      status: 200,
      data: { message: "Resource deleted" },
      response: res,
    });
  }
}
