import { RequestError } from "../errors/RequestError";
import { Mutable } from "../types/Mutable";

export default function parseError(error: RequestError): RequestError {
  const keys = Object.getOwnPropertyNames(error) as Array<keyof RequestError>;
  const data: Mutable<Partial<RequestError>> = {};

  keys.forEach((key) => {
    data[key] = error[key] as any;
  });

  delete data.stack;

  return data as RequestError;
}
