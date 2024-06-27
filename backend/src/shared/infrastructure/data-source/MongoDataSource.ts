import { Collection, Db, Filter, OptionalUnlessRequiredId } from "mongodb";
import Container from "../../../server/dependency-injection/Container";
import Entity from "../../domain/entities/Entity";
import { DataSource } from "../../types/DataSource";
import { Filter as CustomFilter } from "../../types/Filter";

export default class MongoDataSource<T extends Entity>
  implements DataSource<T>
{
  private collection: Collection<T>;

  constructor(collectionName: string) {
    const database = Container.get<Db>("MongoDB.database");

    this.collection = database.collection<T>(collectionName);
  }

  public async getAll(filter: CustomFilter<T>): Promise<T[]> {
    const operation = this.collection.find(filter as Filter<T>);

    return operation.toArray() as unknown as T[];
  }

  public async getOne(filter: CustomFilter<T>): Promise<T | null> {
    return this.collection.findOne(filter as Filter<T>) as unknown as T | null;
  }

  public async getByID(id: string): Promise<T | null> {
    const filter = { id } as unknown as Filter<T>;

    return this.collection.findOne(filter) as unknown as T | null;
  }

  async create(data: T): Promise<void> {
    data.preSave();

    await this.collection.insertOne(data as OptionalUnlessRequiredId<T>);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const filter = { id } as unknown as Filter<T>;
    const updateData = { $set: data };

    const result = await this.collection.findOneAndUpdate(filter, updateData);

    return result as T;
  }

  async delete(id: string): Promise<void> {
    const filter = { id } as unknown as Filter<T>;

    await this.collection.deleteOne(filter);
  }
}
