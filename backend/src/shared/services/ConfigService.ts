import { config } from "dotenv";

export default abstract class ConfigService<T extends object> {
  public static setup(): void {
    config();

    const env = process.env.NODE_ENV || "production";

    config({ path: `../../../.${env}.env` });
  }

  private readonly config: T;

  constructor() {
    this.config = this.loadConfig();
  }

  protected abstract loadConfig(): T;

  public get<K extends keyof T>(key: K): T[K] {
    return this.config[key];
  }
}
