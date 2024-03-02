import Inject from "../../shared/decorators/Inject";
import { DataSource } from "../../shared/types/DataSource";
import Link from "../domain/Link";

export default class LinkRepository {
  constructor(
    @Inject("Link.DataSource")
    private readonly linkDataSource: DataSource<Link>,
  ) {}

  public async getLinkByID(id: string): Promise<Link | null> {
    const link = await this.linkDataSource.getByID(id);

    return Link.create(link);
  }
}
