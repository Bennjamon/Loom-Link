import { RequestHandler, Request, Response, NextFunction } from "express";
import HttpMethods from "../constants/httpMethods";
import { Route } from "../types/Route";
import { RequestError, ServerError } from "../errors/RequestError";
import parseError from "../utils/parseError";

type HandlerDecorator = (
  path: string,
  ...middlewares: RequestHandler[]
) => MethodDecorator;

function handlerDecorator(method: HttpMethods): HandlerDecorator {
  return (path, ...middlewares) =>
    <T>(
      target: object,
      key: string | symbol,
      descriptor: TypedPropertyDescriptor<T>,
    ) => {
      const routes: Route[] = Reflect.getMetadata("routes", target) || [];

      routes.push({
        path,
        method,
        key,
        middlewares,
      });

      Reflect.defineMetadata("routes", routes, target);

      return {
        async value(req: Request, res: Response, next: NextFunction) {
          try {
            const handler = descriptor.value as RequestHandler;

            await handler.call(this, req, res, next);
          } catch (error) {
            if (RequestError.isRequestError(error)) {
              res.status(error.status).send({ error: parseError(error) });

              return;
            }

            const serverError = new ServerError();

            res
              .status(serverError.status)
              .send({ error: parseError(serverError) });

            // eslint-disable-next-line no-console
            console.error(error);
          }
        },
      } as TypedPropertyDescriptor<T>;
    };
}

export const Get = handlerDecorator(HttpMethods.GET);
export const Post = handlerDecorator(HttpMethods.POST);
export const Patch = handlerDecorator(HttpMethods.PATCH);
export const Put = handlerDecorator(HttpMethods.PUT);
export const Delete = handlerDecorator(HttpMethods.DELETE);
