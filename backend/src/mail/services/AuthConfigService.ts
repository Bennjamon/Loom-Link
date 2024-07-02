import ConfigService from "../../shared/services/ConfigService";

interface AuthConfig {
  env: string;
  user: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

export default class AuthConfigService extends ConfigService<AuthConfig> {
  protected loadConfig(): AuthConfig {
    return {
      env: process.env.NODE_ENV!,
      user: process.env.MAIL_USER!,
      clientId: process.env.OAUTH_CLIENTID!,
      clientSecret: process.env.OAUTH_CLIENT_SECRET!,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN!,
    };
  }
}
