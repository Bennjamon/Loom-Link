/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import getDomainData from "../../shared/utils/getDomainData";
import Container from "./Container";
import domains from "./domains";

export default async function setupDependencies() {
  for (const domain of domains) {
    const { dependencies, controllers } = getDomainData(domain);

    for (const dependency of dependencies) {
      await Container.register(dependency);
    }

    for (const controller of controllers) {
      await Container.register(controller);
    }
  }
}
