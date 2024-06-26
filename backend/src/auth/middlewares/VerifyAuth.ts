import { RequestHandler } from "express";
import Container from "../../server/dependency-injection/Container";
import UserSessionService from "../../user/services/UserSession.service";
import UserService from "../../user/services/User.service";

const VerifyAuth: RequestHandler = async (req, res, next) => {
  const userSessionService =
    Container.get<UserSessionService>(UserSessionService);
  const userService = Container.get<UserService>(UserService);

  const { authorization = "" } = req.headers;
  const id = authorization.replace(/^Bearer +/, "");

  const session = await userSessionService.getUserSessionByID(id);
  const user = await userService.getUserByID(session.userID);

  req.user = user;
  req.userSession = session;

  next();
};

export default VerifyAuth;
