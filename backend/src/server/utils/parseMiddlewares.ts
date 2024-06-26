import { RequestHandler } from "express";
import { RequestError, ServerError } from "../../shared/errors/RequestError";
import parseError from "../../shared/utils/parseError";

export default function parseMiddlewares(
  middlewares: RequestHandler[],
): RequestHandler[] {
  return middlewares.map((middleware) => async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (error) {
      if (RequestError.isRequestError(error)) {
        res.status(error.status).send({ error: parseError(error) });

        return;
      }

      const serverError = new ServerError();

      res.status(serverError.status).send({ error: parseError(serverError) });

      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
}
