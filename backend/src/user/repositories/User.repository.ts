import Inject from "../../shared/decorators/Inject";
import { DataSource } from "../../shared/types/DataSource";
import { Filter } from "../../shared/types/Filter";
import User from "../domain/User";

export default class UserRepository {
  constructor(
    @Inject("User.DataSource")
    private readonly userDataSource: DataSource<User>,
  ) {}

  public async getUserByID(id: string): Promise<User | null> {
    const user = await this.userDataSource.getByID(id);

    return User.create(user);
  }

  public async getOneUser(filter: Filter<User>): Promise<User | null> {
    const user = await this.userDataSource.getOne(filter);

    return User.create(user);
  }
}
