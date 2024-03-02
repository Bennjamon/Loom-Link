import ConfigService from "./ConfigService";

interface MongoConfig {
  prefix: string;
  user?: string;
  password?: string;
  uri: string;
  dbName: string;
}

export default class MongoConfigService extends ConfigService<MongoConfig> {
  protected loadConfig(): MongoConfig {
    return {
      prefix: process.env.MONGO_PREFIX || "mongodb://",
      user: process.env.MONGO_URI,
      password: process.env.MONGO_PASSWORD,
      uri: process.env.MONGO_URI || "localhost",
      dbName: process.env.MONGO_DB_NAME || "loom-link",
    };
  }
}
