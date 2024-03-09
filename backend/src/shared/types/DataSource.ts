import Entity from "../domain/entities/Entity";
import { Filter } from "./Filter";

export interface DataSource<T extends Entity> {
  getAll(filter?: Filter<T>): Promise<T[]>;
  getOne(filter: Filter<T>): Promise<T | null>;
  getByID(id: string): Promise<T | null>;
  create(data: T): Promise<void>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
