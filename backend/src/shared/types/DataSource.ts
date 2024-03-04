import Entity from "../domain/entities/Entity";
import { Filter } from "./Filter";

export interface DataSource<T extends Entity> {
  getAll(filter?: Filter<T>): Promise<T[]>;
  getByID(id: string): Promise<T | null>;
  create(data: T): Promise<void>;
  update(id: string, data: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}
