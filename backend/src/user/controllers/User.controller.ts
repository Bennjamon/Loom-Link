import { Request, Response } from "express";
import Controller from "../../shared/decorators/Controller";
import { Get } from "../../shared/decorators/HandlerDecorators";
import UserService from "../services/User.service";
import UserSessionService from "../services/UserSession.service";
import VerifyAuth from "../../auth/middlewares/VerifyAuth";

@Controller("/users")
export default class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userSessionService: UserSessionService,
  ) {}

  @Get("/", VerifyAuth) public getUser(req: Request, res: Response): void {
    const { user } = req;

    res.send({
      user: user.getInfo(),
    });
  }

  @Get("/sessions", VerifyAuth)
  public async getUserSessions(req: Request, res: Response) {
    const { user: _user } = req;

    const sessions = await this.userSessionService.getAllUserSessions(_user.id);

    res.send({
      sessions: sessions.map((session) => session.getInfo()),
    });
  }
}
