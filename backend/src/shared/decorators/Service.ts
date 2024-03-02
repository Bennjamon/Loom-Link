import { Token } from "../types/Token";

export default function Service(token?: Token): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata("isService", true, target);
    Reflect.defineMetadata("token", token || target, target);
  };
}
