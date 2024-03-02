import { Dependency } from "./Dependency";

export interface DomainData {
  controllers: Dependency[];
  dependencies: Dependency[];
}
