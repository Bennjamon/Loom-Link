import { Collection, Db, Filter, OptionalUnlessRequiredId } from "mongodb";
import Container from "../../../server/dependency-injection/Container";
import Entity from "../../domain/entities/Entity";
import { DataSource } from "../../types/DataSource";

export default class MongoDataSource<T extends Entity>
  implements DataSource<T>
{
  private collection: Collection<T>;

  constructor(collectionName: string) {
    const database = Container.get<Db>("MongoDB.database");

    this.collection = database.collection<T>(collectionName);
  }

  public async getAll(): Promise<T[]> {
    const operation = this.collection.find();

    return operation.toArray() as unknown as T[];
  }

  public async getByID(id: string): Promise<T | null> {
    const filter = { id } as unknown as Filter<T>;

    return this.collection.findOne(filter) as unknown as T | null;
  }

  async create(data: T): Promise<void> {
    data.preSave();

    await this.collection.insertOne(data as OptionalUnlessRequiredId<T>);
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const filter = { id } as unknown as Filter<T>;

    await this.collection.updateOne(filter, data);
  }

  async delete(id: string): Promise<void> {
    const filter = { id } as unknown as Filter<T>;

    await this.collection.deleteOne(filter);
  }
}
