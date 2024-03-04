import { hashSync } from "bcrypt";
import Entity from "../../shared/domain/entities/Entity";

export default class User extends Entity {
  private static readonly PASSWORD_HASH_SALT_ROUNDS = 12;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public password: string,
  ) {
    super();
  }

  public preSave(): void {
    this.password = hashSync(this.password, User.PASSWORD_HASH_SALT_ROUNDS);
  }

  protected getPrivateFields(): string[] {
    return ["password"];
  }
}
