import { TrashIcon } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoInstance } from "@/lib/axios";
import type { Todo } from "./types";

export default function TodoComponect({ todo }: { todo: Todo }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["deleteTodo", todo.id],
    mutationFn: async () => todoInstance.delete(`/${todo.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoData"] });
    },
  });

  return (
    <li className="dark:text-white flex items-center space-x-2 ">
      <TrashIcon
        className="w-4 h-4 dark:text-white hover:text-red-500 dark:hover:text-red-500"
        onClick={() => mutate()}
      />
      <label className="dark:text-white flex-1 text-left text-xl font-normal">
        {todo.title}
      </label>
    </li>
  );
}
