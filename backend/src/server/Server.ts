import express, {
  Express,
  Router,
  json,
  urlencoded,
  static as expressStatic,
} from "express";
import { Server as HttpServer } from "http";
import { resolve as resolvePath } from "path";
import { existsSync } from "fs";
import domains from "./dependency-injection/domains";
import getDomainData from "../shared/utils/getDomainData";
import Container from "./dependency-injection/Container";
import getToken from "../shared/utils/getToken";
import getControllerData from "../shared/utils/getControllerData";
import { NotFoundError } from "../shared/errors/RequestError";
import parseError from "../shared/utils/parseError";

export default class Server {
  private app: Express;

  private httpServer?: HttpServer;

  constructor(
    public readonly port: number,
    public readonly host: string,
  ) {
    this.app = express();
    this.app.use(urlencoded({ extended: true }));
    this.app.use(json());
    this.loadApiRoutes();
    this.loadWeb();
    this.loadHandlers();
  }

  public start(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.app.listen(this.port, this.host, () => {
        console.log(`Server listening on ${this.host}:${this.port}`);

        resolve();
      });
    });
  }

  public stop(): Promise<void> {
    const httpServer = this.getHttpServer();

    return new Promise((resolve, reject) => {
      httpServer.close((err) => {
        if (err) {
          reject(err);
        } else {
          this.httpServer = undefined;

          resolve();
        }
      });
    });
  }

  public getHttpServer(): HttpServer {
    if (!this.httpServer) throw new Error("Server is not running");

    return this.httpServer;
  }

  public getApp(): Express {
    return this.app;
  }

  private loadApiRoutes(): void {
    const apiRouter = Router();

    domains.forEach((domain) => {
      const { controllers } = getDomainData(domain);

      controllers.forEach((controller) => {
        const token = getToken(controller);
        const instance = Container.get(token);
        const controllerData = getControllerData(instance);

        const router = Router();

        controllerData.routes.forEach((route) => {
          const handler = instance[route.key];

          router[route.method](
            route.path.replace(/\/$/, ""),
            handler.bind(instance),
          );
        });

        apiRouter.use(controllerData.path, router);
      });
    });

    this.app.use("/api", apiRouter);
  }

  private loadWeb(): void {
    const webPath = resolvePath(__dirname, "../../../web/dist");

    if (existsSync(webPath)) {
      this.app.use(expressStatic(webPath));
    }
  }

  private loadHandlers(): void {
    this.app.use((req, res) => {
      const notFoundError = new NotFoundError();

      res
        .status(notFoundError.status)
        .send({ error: parseError(notFoundError) });
    });
  }
}
