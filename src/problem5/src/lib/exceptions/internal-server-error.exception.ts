import { HttpException } from "./http-exception";

export class InternalServerErrorException extends HttpException {
  static status = 500;
  static message = "Internal Server Error";
  constructor(message: string = "Internal Server Error") {
    super({ status: 500, message });
  }
}
