import Service from "../../shared/decorators/Service";
import { UnauthorizedError } from "../../shared/errors/RequestError";
import UserSession from "../../user/domain/UserSession";
import UserRepository from "../../user/repositories/User.repository";
import UserSessionRepository from "../../user/repositories/UserSession.repository";

@Service()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userSessionRepository: UserSessionRepository,
  ) {}

  public async login(
    name: string,
    password: string,
    ip: string,
    userAgent: string,
  ): Promise<UserSession> {
    const user = await this.userRepository.getOneUser({ name });

    if (!user || !user.checkPassword(password)) {
      throw new UnauthorizedError("INVALID_CREDENTIALS");
    }

    const session = await this.userSessionRepository.getOneUserSession({
      userID: user.id,
      ip,
      userAgent,
    });

    if (session !== null) {
      return this.userSessionRepository.updateUserSession(session.id, {
        expiredAt: Date.now() + 1000 * 60 * 60 * 24,
      });
    }

    const newSession = UserSession.create({
      expiredAt: Date.now() + 1000 * 60 * 60 * 24,
      userID: user.id,
      ip,
      userAgent,
    });

    await this.userSessionRepository.createUserSession(newSession);

    return newSession;
  }
}
