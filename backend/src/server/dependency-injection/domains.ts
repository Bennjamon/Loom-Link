import LinkDomain from "../../link/domain/Link.domain";
import MailDomain from "../../mail/domain/Mail.domain";
import SharedDomain from "../../shared/domain/Shared.domain";
import { Constructor } from "../../shared/types/Constructor";
import UserDomain from "../../user/domain/User.domain";
import BackendApplication from "../App";

const domains: Constructor<any>[] = [
  SharedDomain,
  MailDomain,
  UserDomain,
  LinkDomain,
  BackendApplication,
];

export default domains;
