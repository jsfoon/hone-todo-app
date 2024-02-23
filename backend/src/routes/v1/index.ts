import { Hono } from "hono";

import todoApp from "./todo";

const v1App = new Hono().route("/todos", todoApp);

export default v1App;
