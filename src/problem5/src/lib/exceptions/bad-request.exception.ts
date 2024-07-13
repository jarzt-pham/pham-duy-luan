import { HttpException } from "./http-exception";

export class BadRequestException extends HttpException {
  static status = 400;
  static message = "Bad Request";
  constructor(message: string = "Bad Request") {
    super({ status: 400, message });
  }
}
