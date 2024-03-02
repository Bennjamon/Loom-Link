import { Constructor } from "./Constructor";
import { Token } from "./Token";

type ClassDependency = {
  class: Constructor<any>;
  args?: any[];
  token?: Token;
};

type FactoryDependency = {
  factory: (...args: any[]) => any;
  args?: any[];
  token: Token;
};

export type Dependency = Constructor<any> | ClassDependency | FactoryDependency;
