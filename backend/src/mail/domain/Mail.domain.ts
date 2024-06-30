import Domain from "../../shared/decorators/Domain";
import MailService from "../services/Mail.service";

@Domain({
  dependencies: [MailService],
})
export default class MailDomain {}
