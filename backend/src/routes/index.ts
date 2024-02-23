import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

import v1App from "./v1";
import healthApp from "./healthcheck";

const app = new Hono()
  .use(logger())
  .use(cors())
  .route("/v1", v1App)
  .route("/healthz", healthApp);

export default app;
