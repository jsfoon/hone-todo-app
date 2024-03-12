import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import {
  createTodo,
  deleteTodo,
  selectTodos,
  updateTodo,
} from "../../models/todo";

const titleScheme = zValidator(
  "json",
  z.object({
    title: z.string(),
  })
);

const idScheme = zValidator(
  "param",
  z.object({
    id: z.string().regex(/^\d+$/),
  })
);

const todoApp = new Hono()
  .get("/", async (c) => {
    const todos = await selectTodos();
    return c.json({ todos });
  })
  .post("/create", titleScheme, async (c) => {
    const { title } = await c.req.json();
    const todo = await createTodo(title);
    return c.json({ todo });
  })
  .put("/:id", titleScheme, idScheme, async (c) => {
    const id = Number(c.req.param("id"));
    const { title } = await c.req.json();
    const todo = await updateTodo(id, title);
    return c.json({ todo });
  })
  .delete("/:id", idScheme, async (c) => {
    const { id } = c.req.param();
    const todo = await deleteTodo(id);
    return c.json({ todo });
  });

export default todoApp;
