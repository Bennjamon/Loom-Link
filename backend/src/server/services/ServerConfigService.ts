import ConfigService from "../../shared/services/ConfigService";

type ServerConfig = {
  host: string;
  port: number;
};

export default class ServerConfigService extends ConfigService<ServerConfig> {
  protected loadConfig(): ServerConfig {
    return {
      host: process.env.HOST || "localhost",
      port: parseInt(process.env.PORT || "3000", 10) || 3000,
    };
  }
}
