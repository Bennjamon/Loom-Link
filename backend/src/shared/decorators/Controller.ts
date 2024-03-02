import { RequestHandler } from "express";

export default function Controller(
  path: string,
  ...middlewares: RequestHandler[]
): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata("isController", true, target.prototype);
    Reflect.defineMetadata("path", path, target.prototype);
    Reflect.defineMetadata("middlewares", middlewares, target.prototype);
  };
}
