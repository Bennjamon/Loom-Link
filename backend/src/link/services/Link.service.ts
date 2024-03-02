import Service from "../../shared/decorators/Service";
import { NotFoundError } from "../../shared/errors/RequestError";
import Link from "../domain/Link";
import LinkRepository from "../repositories/Link.repository";

@Service()
export default class LinkService {
  constructor(private readonly linkRepository: LinkRepository) {}

  public async getLinkByID(id: string): Promise<Link> {
    const link = await this.linkRepository.getLinkByID(id);

    if (link === null) throw new NotFoundError("Link not found");

    return link;
  }
}
