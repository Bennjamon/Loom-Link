import { compareSync, hashSync } from "bcrypt";
import Entity from "../../shared/domain/entities/Entity";
import { InvalidArgumentError } from "../../shared/errors/RequestError";

export default class User extends Entity {
  private static readonly PASSWORD_HASH_SALT_ROUNDS = 12;

  private static readonly PASSWORD_PATTERN =
    /^((?![^A-Z]+$)(?![^a-z]+$)(?![^0-9]+$)(?![A-Za-z0-9]+$).{8,}$)/;

  private static readonly EMAIL_PATTERN = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public password: string,
    public isVerified: boolean,
  ) {
    super();
  }

  public preSave(): void {
    this.validateFields();
    this.isVerified = false;

    this.password = hashSync(this.password, User.PASSWORD_HASH_SALT_ROUNDS);
  }

  public checkPassword(password: string): boolean {
    return compareSync(password, this.password);
  }

  protected getPrivateFields(): string[] {
    return ["password"];
  }

  protected getRequiredFields(): string[] {
    const optionalKeys = ["isVerified"];

    return Object.keys(this).filter((key) => !optionalKeys.includes(key));
  }

  private validateFields(): void {
    if (!User.PASSWORD_PATTERN.test(this.password)) {
      throw new InvalidArgumentError("Unsafe password");
    }

    if (!User.EMAIL_PATTERN.test(this.email)) {
      throw new InvalidArgumentError("Invalid email");
    }
  }
}
