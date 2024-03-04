import Domain from "../../shared/decorators/Domain";
import MongoDataSource from "../../shared/infrastructure/data-source/MongoDataSource";
import UserController from "../controllers/User.controller";
import UserRepository from "../repositories/User.repository";
import UserService from "../services/User.service";

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
    UserRepository,
    UserService,
  ],
  controllers: [UserController],
})
export default class UserDomain {}
