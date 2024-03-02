import { Dependency } from "../types/Dependency";
import { Token } from "../types/Token";

export default function getToken(dependency: Dependency): Token {
  if (dependency instanceof Function) {
    return dependency;
  }

  if ("class" in dependency) {
    return dependency.token || dependency.class;
  }

  return dependency.token;
}
