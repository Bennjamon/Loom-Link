import { RequestHandler } from "express";
import HttpMethods from "../constants/httpMethods";

export interface Route {
  path: string;
  key: string | symbol;
  method: HttpMethods;
  middlewares: RequestHandler[];
}
