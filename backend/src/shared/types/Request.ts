import User from "../../user/domain/User";
import UserSession from "../../user/domain/UserSession";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      _user: User;
      _userSession: UserSession;
    }
  }
}
