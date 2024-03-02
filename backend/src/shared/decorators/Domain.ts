import { DomainData } from "../types/DomainData";

export default function Domain(info: Partial<DomainData>): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata("isDomain", true, target);
    Reflect.defineMetadata("controllers", info.controllers || [], target);
    Reflect.defineMetadata("dependencies", info.dependencies || [], target);
  };
}
