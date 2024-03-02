import { Constructor } from "../types/Constructor";
import { ControllerData } from "../types/ControllerData";

export default function getControllerData(controller: any): ControllerData {
  const { constructor }: { constructor: Constructor<any> } = controller;

  const isController: boolean = Reflect.getMetadata(
    "isController",
    constructor.prototype,
  );

  if (!isController) throw new Error(`${constructor.name} is not a controller`);

  return {
    path: Reflect.getMetadata("path", constructor.prototype),
    routes: Reflect.getMetadata("routes", constructor.prototype),
    middlewares: Reflect.getMetadata("middlewares", constructor.prototype),
  };
}
