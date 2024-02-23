import { useQuery } from "@tanstack/react-query";

import { todoInstance } from "@/lib/axios";
import Todo from "./todo";
import type { QueryTodos } from "./types";
import AddTodo from "./addTodo";

export default function TodoList() {
  const { isPending, error, data } = useQuery<QueryTodos>({
    queryKey: ["todoData"],
    queryFn: () => todoInstance.get("").then((res) => res.data),
  });

  return (
    <div className="dark px-4 py-8 md:py-12 lg:py-16 dark:bg-gray-900 dark:text-white">
      <div className="container grid gap-4 px-4 text-center md:px-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Todo List
          </h1>
        </div>
        <AddTodo />
        <div className="mx-auto max-w-sm space-y-2">
          {isPending && <div>Loading...</div>}
          {error && <div>{error.message}</div>}
          <ul className="dark:text-white grid gap-2">
            {data?.todos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
