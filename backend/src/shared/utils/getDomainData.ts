import { Constructor } from "../types/Constructor";
import { DomainData } from "../types/DomainData";

export default function getDomainData(domain: Constructor<any>): DomainData {
  const isDomain = Reflect.getMetadata("isDomain", domain);

  if (!isDomain) throw new Error(`${domain.name} is not a domain`);

  return {
    dependencies: Reflect.getMetadata("dependencies", domain),
    controllers: Reflect.getMetadata("controllers", domain),
  };
}
