import { describe, it, expect } from "bun:test";

import healthApp from "./index";

describe("healthcheck", () => {
  it("GET /", async () => {
    const res = await healthApp.request("/");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("OK");
  });
});
