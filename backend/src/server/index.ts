import "reflect-metadata";

import ConfigService from "../shared/services/ConfigService";
import setupDependencies from "./dependency-injection/setupDependencies";
import BackendApplication from "./App";

async function start() {
  try {
    ConfigService.setup();
    await setupDependencies();

    const app = new BackendApplication();

    await app.start();
  } catch (error) {
    console.log("Error while starting server: ", error);
  }
}

start();
