import Domain from "../decorators/Domain";
import MongoConfigService from "../services/MongoConfigService";
import MongoDatabaseFactory from "../infrastructure/MongoClientFactory";

@Domain({
  dependencies: [
    MongoConfigService,
    {
      factory: MongoDatabaseFactory.getDatabase,
      args: [MongoConfigService],
      token: "MongoDB.database",
    },
  ],
})
export default class SharedDomain {}
