import Domain from "../../shared/decorators/Domain";
import NodemailerImplementaion from "../infrastructure/mailer/Nodemailer";
import AuthConfigService from "../services/AuthConfigService";
import MailService from "../services/Mail.service";
import Mailer from "../types/Mailer";

@Domain({
  dependencies: [
    AuthConfigService,
    {
      token: "Mail.Mailer",
      class: NodemailerImplementaion,
    },
    {
      token: MailService,
      factory: async (mailer: Mailer) => {
        const mailService = new MailService(mailer);

        await mailService.setup();

        return mailService;
      },
      args: ["@Mail.Mailer"],
    },
  ],
})
export default class MailDomain {}
