import Entity from "../domain/entities/Entity";

export type Filter<T extends Entity> = {
  [K in keyof T]?: T[K];
};
