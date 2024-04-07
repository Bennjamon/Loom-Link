import Domain from "../../shared/decorators/Domain";
import AuthController from "../controllers/Auth.controller";
import AuthService from "../services/Auth.service";

@Domain({
  dependencies: [AuthService],
  controllers: [AuthController],
})
export default class AuthDomain {}
