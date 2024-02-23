import { Hono } from "hono";

const healthApp = new Hono().get("/", (c) => c.text("OK"));

export default healthApp;
