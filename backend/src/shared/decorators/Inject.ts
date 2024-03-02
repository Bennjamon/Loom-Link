import { InjectedData } from "../types/InjectedData";
import { Token } from "../types/Token";

export default function Inject(token: Token): ParameterDecorator {
  return (target, key, index) => {
    const injected: InjectedData[] =
      Reflect.getMetadata("injectedData", target) || [];

    injected.push({
      index,
      token,
    });

    Reflect.defineMetadata("injectedData", injected, target);
  };
}
