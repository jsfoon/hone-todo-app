import { sql } from "sqlx-ts";
import pool from "../../db";
import type { ISelectTodosQueryResult } from "./index.queries";

const selectTodosQuery = sql`select * from todos`;
const selectTodos = async () => {
  const { rows } = await pool.query<ISelectTodosQueryResult>(selectTodosQuery);

  return rows;
};

const createTodoQuery = sql`insert into todos (title) values ($1) returning id,title`;
const createTodo = async (title: string) => {
  const { rows } = await pool.query<ISelectTodosQueryResult>(createTodoQuery, [
    title,
  ]);

  return rows[0];
};

const updateTodoQuery = sql`update todos set title = $1 where id = $2 returning *`;
const updateTodo = async (id: number, title: string) => {
  const { rows } = await pool.query<ISelectTodosQueryResult>(updateTodoQuery, [
    title,
    id,
  ]);

  return rows[0];
};

const deleteTodoQuery = sql`delete from todos where id = $1 returning *`;
const deleteTodo = async (title: string) => {
  const { rows } = await pool.query<ISelectTodosQueryResult>(deleteTodoQuery, [
    title,
  ]);

  return rows[0];
};

export { createTodo, deleteTodo, selectTodos, updateTodo };
