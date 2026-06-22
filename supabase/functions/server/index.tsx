import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", logger(console.log));
app.use("/*", cors({
  origin: "*",
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
}));

app.get("/make-server-1edba938/health", (c) => c.json({ status: "ok" }));

// Projects
app.get("/make-server-1edba938/projects", async (c) => c.json(await kv.get("rois:projects") ?? []));
app.post("/make-server-1edba938/projects", async (c) => { await kv.set("rois:projects", await c.req.json()); return c.json({ ok: true }); });

// CV
app.get("/make-server-1edba938/cv", async (c) => c.json(await kv.get("rois:cv") ?? null));
app.post("/make-server-1edba938/cv", async (c) => { await kv.set("rois:cv", await c.req.json()); return c.json({ ok: true }); });

// Portfolio Showcases
app.get("/make-server-1edba938/showcases", async (c) => c.json(await kv.get("rois:showcases") ?? []));
app.post("/make-server-1edba938/showcases", async (c) => { await kv.set("rois:showcases", await c.req.json()); return c.json({ ok: true }); });

// Hero Photo
app.get("/make-server-1edba938/hero", async (c) => c.json(await kv.get("rois:hero") ?? {}));
app.post("/make-server-1edba938/hero", async (c) => { await kv.set("rois:hero", await c.req.json()); return c.json({ ok: true }); });

Deno.serve(app.fetch);
