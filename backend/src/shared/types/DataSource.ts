import Entity from "../domain/entities/Entity";

export interface DataSource<T extends Entity> {
  getAll(): Promise<T[]>;
  getByID(id: string): Promise<T | null>;
  create(data: T): Promise<void>;
  update(id: string, data: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}
