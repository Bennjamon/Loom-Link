import { Db, MongoClient } from "mongodb";
import MongoConfigService from "../services/MongoConfigService";

export default class MongoDatabaseFactory {
  public static async getDatabase(
    mongoConfigService: MongoConfigService,
  ): Promise<Db> {
    const prefix = mongoConfigService.get("prefix");
    const user = mongoConfigService.get("user");
    const password = mongoConfigService.get("password");
    const uri = mongoConfigService.get("uri");
    const dbName = mongoConfigService.get("dbName");

    let connectionString = prefix;

    if (user && password) {
      connectionString += `${user}:${password}@`;
    }

    connectionString += uri;
    connectionString += `/${dbName}`;

    const client = await MongoClient.connect(connectionString);

    console.log(`MongoDB database connected`);

    return client.db(dbName);
  }
}
