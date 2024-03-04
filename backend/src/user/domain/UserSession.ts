import Entity from "../../shared/domain/entities/Entity";

export default class UserSession extends Entity {
  constructor(
    public readonly id: string,
    public readonly ip: string,
    public readonly userAgent: string,
    public readonly userID: string,
    public readonly expiredAt: string,
  ) {
    super();
  }
}
