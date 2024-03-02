import { Request, Response } from "express";
import Controller from "../../shared/decorators/Controller";
import { Get } from "../../shared/decorators/HandlerDecorators";
import LinkService from "../services/Link.service";

@Controller("/links")
export default class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get("/:id")
  public async getAllLinks(req: Request, res: Response) {
    const { id } = req.params;

    const link = await this.linkService.getLinkByID(id);

    res.send(link);
  }
}
