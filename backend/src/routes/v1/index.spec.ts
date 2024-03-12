import { describe, it, expect, afterAll } from "bun:test";

import todosApp from "./todo";

import { ISelectTodosQueryResult } from "../../models/todo/index.queries";

describe("todos", () => {
  // afterAll(async () => {
  //   const res = await todosApp.request("/");
  //   const result = (await res.json()) as { todos: ISelectTodosQueryResult[] };
  //   await Promise.all(
  //     result.todos.map(async (todo) => {
  //       await todosApp.request(`/${todo.id}`, {
  //         method: "DELETE",
  //       });
  //     })
  //   );
  // });
  it("GET /todos", async () => {
    const res = await todosApp.request("/");
    expect(res.status).toBe(200);
    const result = (await res.json()) as { todos: ISelectTodosQueryResult[] };
    expect(Array.isArray(result.todos)).toBe(true);
  });

  it("POST /todos", async () => {
    const res = await todosApp.request("/create", {
      method: "POST",
      body: JSON.stringify({ title: "create todo" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(res.status).toBe(200);
    const result = (await res.json()) as { todo: ISelectTodosQueryResult };
    expect(result.todo.title).toBe("create todo");
  });

  it("POST /todos with number", async () => {
    const res = await todosApp.request("/create", {
      method: "POST",
      body: JSON.stringify({ title: 123 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(res.status).toBe(400);
    const result = await res.json();
    expect(result).toMatchSnapshot();
  });
  it("PUT /todos/:id", async () => {
    const createRes = await todosApp.request("/create", {
      method: "POST",
      body: JSON.stringify({ title: "pre update todo" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(createRes.status).toBe(200);
    const createResult = (await createRes.json()) as {
      todo: ISelectTodosQueryResult;
    };
    expect(createResult.todo.title).toBe("pre update todo");
    const res = await todosApp.request(`/${createResult.todo.id}`, {
      method: "PUT",
      body: JSON.stringify({ title: "update todo" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(res.status).toBe(200);
    const result = (await res.json()) as { todo: ISelectTodosQueryResult };
    expect(result.todo.title).toBe("update todo");
  });

  it("PUT /todos/:id with string", async () => {
    const res = await todosApp.request(`/qwe`, {
      method: "PUT",
      body: JSON.stringify({ title: "update todo" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(res.status).toBe(400);
    const content = await res.text();
    expect(content).toMatchSnapshot();
  });

  it("DELETE /todos/:id", async () => {
    const createRes = await todosApp.request("/create", {
      method: "POST",
      body: JSON.stringify({ title: "pre delete todo" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(createRes.status).toBe(200);
    const createResult = (await createRes.json()) as {
      todo: ISelectTodosQueryResult;
    };

    const res = await todosApp.request(`/${createResult.todo.id}`, {
      method: "DELETE",
    });
    expect(res.status).toBe(200);
    const result = (await res.json()) as { todo: ISelectTodosQueryResult };
    expect(result.todo.title).toBe("pre delete todo");
    expect(result.todo.id).toBe(createResult.todo.id);
  });

  it("DELETE /todos/:id with string", async () => {
    const res = await todosApp.request(`/qwe`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(res.status).toBe(400);
    const content = await res.text();
    expect(content).toMatchSnapshot();
  });
});
