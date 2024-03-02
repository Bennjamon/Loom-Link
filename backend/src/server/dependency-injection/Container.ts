/* eslint-disable new-cap */
import { Constructor } from "../../shared/types/Constructor";
import { Dependency } from "../../shared/types/Dependency";
import { InjectedData } from "../../shared/types/InjectedData";
import { Token } from "../../shared/types/Token";

export default class Container {
  private static readonly dependencies: Map<Token, any> = new Map();

  public static get<T = any>(token: Token): T {
    return this.dependencies.get(token);
  }

  public static async register(dependency: Dependency): Promise<void> {
    if (dependency instanceof Function) {
      const dependencies = this.resolveDependencies(dependency);

      const instance = new dependency(...dependencies);

      this.dependencies.set(dependency, instance);

      return;
    }

    if ("class" in dependency) {
      const token: Token = dependency.token || dependency.class;

      let { args } = dependency;

      if (args) {
        args = this.parseArgs(args);
      } else {
        args = this.resolveDependencies(dependency.class);
      }

      const instance = new dependency.class(...args);

      this.dependencies.set(token, instance);

      return;
    }

    const { args = [], factory, token } = dependency;

    const result = await factory(...this.parseArgs(args));

    this.dependencies.set(token, result);
  }

  private static resolveDependencies(constructor: Constructor<any>) {
    const paramTypes: Token[] =
      Reflect.getMetadata("design:paramtypes", constructor) || [];
    const injected: InjectedData[] =
      Reflect.getMetadata("injectedData", constructor) || [];

    injected.forEach((injection) => {
      paramTypes[injection.index] = injection.token;
    });

    return paramTypes.map((token) => this.get(token));
  }

  private static parseArgs(args: any[]): any[] {
    return args.map((arg) => {
      if (typeof arg === "string" && arg.startsWith("@")) {
        return this.get(arg.slice(1));
      }

      if (typeof arg === "function") {
        return this.get(arg) || arg;
      }

      return arg;
    });
  }
}
