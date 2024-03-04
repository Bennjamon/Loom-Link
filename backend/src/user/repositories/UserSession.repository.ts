import Inject from "../../shared/decorators/Inject";
import { DataSource } from "../../shared/types/DataSource";
import { Filter } from "../../shared/types/Filter";
import UserSession from "../domain/UserSession";

export default class UserSessionRepository {
  constructor(
    @Inject("UserSession.DataSource")
    private readonly userSessionDataSource: DataSource<UserSession>,
  ) {}

  public async getAllUserSessions(
    filter: Filter<UserSession>,
  ): Promise<UserSession[]> {
    const sessions = await this.userSessionDataSource.getAll(filter);

    return sessions.map((session) => UserSession.create(session));
  }

  public async getUserSessionByID(id: string): Promise<UserSession | null> {
    const session = await this.userSessionDataSource.getByID(id);

    return UserSession.create(session);
  }
}
