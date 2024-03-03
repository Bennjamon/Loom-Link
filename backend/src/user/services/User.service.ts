import Service from "../../shared/decorators/Service";
import { NotFoundError } from "../../shared/errors/RequestError";
import User from "../domain/User";
import UserRepository from "../repositories/User.repository";

@Service()
export default class UserSservice {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUserByID(id: string): Promise<User> {
    const user = await this.userRepository.getUserByID(id);

    if (user === null) throw new NotFoundError("User not found");

    return user;
  }
}
