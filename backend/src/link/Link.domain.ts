import Domain from "../shared/decorators/Domain";
import MongoDataSource from "../shared/infrastructure/data-source/MongoDataSource";
import LinkController from "./controllers/Link.controller";
import LinkRepository from "./repositories/Link.repository";
import LinkService from "./services/Link.service";

@Domain({
  dependencies: [
    {
      token: "Link.DataSource",
      class: MongoDataSource,
      args: ["links"],
    },
    LinkRepository,
    LinkService,
  ],
  controllers: [LinkController],
})
export default class LinkDomain {}
