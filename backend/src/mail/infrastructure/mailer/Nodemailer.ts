import { Transporter, createTestAccount, createTransport } from "nodemailer";
import AuthConfigService from "../../services/AuthConfigService";
import Mail from "../../types/Mail";
import Mailer from "../../types/Mailer";
import Inject from "../../../shared/decorators/Inject";

export default class NodemailerImplementaion implements Mailer {
  private transporter?: Transporter;

  constructor(
    @Inject(AuthConfigService)
    private readonly authConfigService: AuthConfigService,
  ) {}

  async setup(): Promise<void> {
    const env = this.authConfigService.get("env");

    if (env === "production") {
      const user = this.authConfigService.get("user");
      const clientId = this.authConfigService.get("clientId");
      const clientSecret = this.authConfigService.get("clientSecret");
      const refreshToken = this.authConfigService.get("refreshToken");

      this.transporter = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user,
          clientId,
          clientSecret,
          refreshToken,
        },
      });
    } else {
      const testAccount = await createTestAccount();

      this.transporter = createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    console.log(`Nodemailer initialized in ${env} mode`);
  }

  async sendMail(mail: Mail): Promise<void> {
    if (!this.transporter) {
      throw new Error("Nodemailer not intialized");
    }

    await this.transporter.sendMail(mail);
  }
}
