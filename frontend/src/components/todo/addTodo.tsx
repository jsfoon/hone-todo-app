import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoInstance } from "@/lib/axios";
import { useRef } from "react";
import { AxiosResponse } from "axios";
import type { CreateTodo, Todo } from "./types";

export default function AddTodo() {
  const titleRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { mutate } = useMutation<
    AxiosResponse<CreateTodo, Todo>,
    Error,
    CreateTodo
  >({
    mutationKey: ["createTodo"],
    mutationFn: async (data) => todoInstance.post<CreateTodo>(`create`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoData"] });
    },
  });

  const handleSubmit = () => {
    if (titleRef.current?.value) {
      mutate({ title: titleRef.current.value });
      titleRef.current.value = "";
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-2">
      <div className="text-gray-500 hover:bg-gray-100 dark:text-white flex rounded-lg border dark:border-gray-700">
        <Input
          ref={titleRef}
          className="dark:text-white rounded-none flex-1"
          placeholder="Enter a new todo item"
          type="text"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <Button
          className="dark:text-white rounded-none w-20 h-10 text-gray-500 hover:bg-gray-100"
          variant="outline"
          onClick={() => handleSubmit()}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
