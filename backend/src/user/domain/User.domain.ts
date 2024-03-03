import Domain from "../../shared/decorators/Domain";
import MongoDataSource from "../../shared/infrastructure/data-source/MongoDataSource";

@Domain({
  dependencies: [
    {
      token: "User.DataSource",
      class: MongoDataSource,
      args: ["users"],
    },
    {
      token: "UserSession.DataSource",
      class: MongoDataSource,
      args: ["user_sessions"],
    },
  ],
})
export default class UserDomain {}
