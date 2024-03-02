import { Constructor } from "../../types/Constructor";
import { CreateResult } from "../../types/CreateResult";

export default class Entity {
  public static create<T, V extends Partial<T> | null>(
    this: Constructor<T>,
    data: V,
  ): CreateResult<T, V> {
    if (data === null) return null as CreateResult<T, V>;

    const instance = new this();

    Object.keys(data).forEach((key) => {
      instance[key as keyof T] = data[key as keyof T] as any;
    });

    return instance as CreateResult<T, V>;
  }
}
