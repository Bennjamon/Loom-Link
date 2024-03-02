import { RequestHandler } from "express";
import { Route } from "./Route";

export interface ControllerData {
  path: string;
  routes: Route[];
  middlewares: RequestHandler[];
}
