import Inject from "../../shared/decorators/Inject";
import { DataSource } from "../../shared/types/DataSource";
import UserSession from "../domain/UserSession";

export default class UserSessionRepository {
  constructor(
    @Inject("UserSession.DataSource")
    private readonly userSessionDataSource: DataSource<UserSession>,
  ) {}

  public async getAllSessionsByUser(userID: string): Promise<UserSession[]> {
    const sessions = await this.userSessionDataSource.getAll({ userID });

    return sessions.map((session) => UserSession.create(session));
  }
}
