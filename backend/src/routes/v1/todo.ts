import { Hono } from "hono";
import {
  createTodo,
  deleteTodo,
  selectTodos,
  updateTodo,
} from "../../models/todo";

const todoApp = new Hono()
  .get("/", async (c) => {
    const todos = await selectTodos();
    return c.json({ todos });
  })
  .post("/create", async (c) => {
    const { title } = await c.req.json();
    const todo = await createTodo(title);
    return c.json({ todo });
  })
  .put("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const { title } = await c.req.json();
    const todo = await updateTodo(id, title);
    return c.json({ todo });
  })
  .delete("/:id", async (c) => {
    const { id } = c.req.param();
    const todo = await deleteTodo(id);
    return c.json({ todo });
  });

export default todoApp;
