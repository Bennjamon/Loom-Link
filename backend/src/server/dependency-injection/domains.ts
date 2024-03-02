import LinkDomain from "../../link/Link.domain";
import SharedDomain from "../../shared/domain/Shared.domain";
import { Constructor } from "../../shared/types/Constructor";
import BackendApplication from "../App";

const domains: Constructor<any>[] = [
  SharedDomain,
  LinkDomain,
  BackendApplication,
];

export default domains;
