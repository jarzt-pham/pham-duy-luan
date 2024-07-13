import { Response } from "express";

export class ResponseFactory {
  static make({
    status,
    data,
    response,
  }: {
    status: number;
    data: any;
    response: Response;
  }) {
    response.status(status).json(data);
  }
}
