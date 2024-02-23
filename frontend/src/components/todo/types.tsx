type Todo = {
  id: number;
  title: string;
};

type QueryTodos = {
  todos: Todo[];
};

type CreateTodo = Omit<Todo, "id">;

export type { Todo, QueryTodos, CreateTodo };
