import Domain from "../shared/decorators/Domain";
import Server from "./Server";
import Container from "./dependency-injection/Container";
import ServerConfigService from "./services/ServerConfigService";

@Domain({
  dependencies: [ServerConfigService],
})
export default class BackendApplication {
  private server: Server;

  constructor() {
    const configService =
      Container.get<ServerConfigService>(ServerConfigService);
    const port = configService.get("port");
    const host = configService.get("host");

    this.server = new Server(port, host);
  }

  public async start(): Promise<void> {
    await this.server.start();
  }

  public async stop(): Promise<void> {
    await this.server.stop();
  }
}
