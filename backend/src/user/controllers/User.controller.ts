import { Request, Response } from "express";
import Controller from "../../shared/decorators/Controller";
import { Get } from "../../shared/decorators/HandlerDecorators";
import UserService from "../services/User.service";
import UserSessionService from "../services/UserSession.service";

@Controller("/users")
export default class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userSessionService: UserSessionService,
  ) {}

  @Get("/") public async getUser(req: Request, res: Response) {
    const sessionID = req.headers.authorization || "";

    const session = await this.userSessionService.getUserSessionByID(sessionID);

    const user = await this.userService.getUserByID(session.userID);

    res.send({
      user: user.getInfo(),
    });
  }
}
