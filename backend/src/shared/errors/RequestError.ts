/* eslint-disable max-classes-per-file */

export class RequestError extends Error {
  public static isRequestError(arg: any): arg is RequestError {
    return (
      arg instanceof RequestError ||
      arg.constructor.prototype instanceof RequestError
    );
  }

  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
  }
}

export class NotFoundError extends RequestError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class BadRequestError extends RequestError {
  constructor(message: string = "Bad request") {
    super(message, 400);
  }
}

export class InvalidArgumemtdError extends RequestError {
  constructor(message: string = "Invalid argument") {
    super(message, 422);
  }
}

export class ServerError extends RequestError {
  constructor() {
    super("Internal server error", 500);
  }
}
