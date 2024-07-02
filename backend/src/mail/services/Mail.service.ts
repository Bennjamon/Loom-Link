import Mail from "../types/Mail";
import Mailer from "../types/Mailer";

export default class MailService {
  constructor(private readonly mailer: Mailer) {}

  public async setup(): Promise<void> {
    try {
      await this.mailer.setup();
    } catch (error) {
      let message: string;

      if (error instanceof Error) {
        message = error.message;
      }

      message ||= `${error}`;

      throw new Error(`Error while initiatilizing mail service: ${message}`);
    }
  }

  public async sendMail(mail: Mail): Promise<void> {
    try {
      await this.mailer.sendMail(mail);
    } catch (error) {
      let message: string;

      if (error instanceof Error) {
        message = error.message;
      }

      message ||= `${error}`;

      throw new Error(`Error while sending mail: ${message}`);
    }
  }
}
