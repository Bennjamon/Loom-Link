import { Request, Response } from "express";
import Controller from "../../shared/decorators/Controller";
import { Post } from "../../shared/decorators/HandlerDecorators";
import AuthService from "../services/Auth.service";

@Controller("/auth")
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  public async login(req: Request, res: Response) {
    const { name, password } = req.body as { name: string; password: string };
    const ip = req.ip || "";
    const userAgent = req.headers["user-agent"] || "";

    const session = await this.authService.login(name, password, ip, userAgent);

    res.json({
      ok: true,
      sessionID: session.id,
      expiredAt: session.expiredAt,
    });
  }
}
