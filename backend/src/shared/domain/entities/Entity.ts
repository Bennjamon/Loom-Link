import { v4 } from "uuid";
import { Constructor } from "../../types/Constructor";
import { CreateResult } from "../../types/CreateResult";
import { InvalidArgumemtError } from "../../errors/RequestError";

export default class Entity {
  public id!: string;

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

  constructor() {
    this.overridePreSave();
  }

  public preSave(): void {
    this.id ||= v4();
    this.checkHasRequiredFields();
  }

  protected getRequiredFields(): string[] {
    return Object.keys(this);
  }

  private checkHasRequiredFields(): void {
    const requiredFields = this.getRequiredFields();

    requiredFields.forEach((field) => {
      const value = this[field as keyof this];

      if (value === undefined || null) {
        throw new InvalidArgumemtError(`${field} is required`);
      }
    });
  }

  private overridePreSave(): void {
    const { preSave: thisPreSave } = this;
    const basePreSave = Entity.prototype.preSave;

    this.preSave = function preSave() {
      basePreSave.apply(this);
      thisPreSave.apply(this);
    };
  }
}
