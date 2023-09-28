import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionBase extends HttpException {
  constructor(
    className: string,
    objectOrError?: string | object | any,
    description?: string,
    status?: number,
  ) {
    if (objectOrError && !objectOrError.message) {
      objectOrError.message`[${className}:${objectOrError.errCode}]: ${objectOrError.errorMessage}`;
    }

    if (!status) {
      status = HttpStatus.BAD_REQUEST;
    }

    super(HttpException.createBody(objectOrError, description), status);
  }
}
