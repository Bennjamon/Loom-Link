import Entity from "../../shared/domain/entities/Entity";

export default class Link extends Entity {
  constructor(
    public readonly id: string,
    public readonly originalURL: string,
    public readonly views: number,
  ) {
    super();
  }
}
