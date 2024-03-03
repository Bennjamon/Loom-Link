import Service from "../../shared/decorators/Service";
import { UnauthorizedError } from "../../shared/errors/RequestError";
import UserSession from "../domain/UserSession";
import UserSessionRepository from "../repositories/UserSession.repository";

@Service()
export default class UserSessionService {
  constructor(private readonly userSessionRepository: UserSessionRepository) {}

  public async getUserSessionByID(id: string): Promise<UserSession> {
    const session = await this.userSessionRepository.getUserSessionByID(id);

    if (session === null) {
      throw new UnauthorizedError("INVALID_SESSION");
    }

    return session;
  }

  public async getAllUserSessions(userID: string): Promise<UserSession[]> {
    const sessions = await this.userSessionRepository.getAllUserSessions({
      userID,
    });

    return sessions.map((session) => UserSession.create(session));
  }
}
