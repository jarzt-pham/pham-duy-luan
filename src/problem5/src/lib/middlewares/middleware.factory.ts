import { NextFunction, Request, Response } from "express";
import { HttpException, InternalServerErrorException } from "../exceptions";

export class MiddlewareFactory {
  static logger(req: any, res: any, next: any) {
    console.log(`[${new Date()}]: Request...`);
    console.log(`[${req.method}]: ${req.originalUrl}`);
    next();
  }

  static errorHandler(
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(`[${new Date()}]: Error...`);
    console.error(err);

    const status = err.status || InternalServerErrorException.status;
    const message = err.message || InternalServerErrorException.message;
    res.status(status).send(message);
  }
}
