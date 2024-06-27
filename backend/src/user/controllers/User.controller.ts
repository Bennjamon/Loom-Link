import { Request, Response } from "express";
import Controller from "../../shared/decorators/Controller";
import { Get, Post } from "../../shared/decorators/HandlerDecorators";
import UserService from "../services/User.service";
import UserSessionService from "../services/UserSession.service";
import VerifyAuth from "../../auth/middlewares/VerifyAuth";
import User from "../domain/User";

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

  @Post("/create")
  public async createUser(req: Request, res: Response): Promise<void> {
    const userData = req.body as Partial<User>;

    const user = await this.userService.createUser(userData);

    res.send({
      user: user.getInfo(),
    });
  }
}
