import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createTodo as createTodoApi,
  deleteTodo as deleteTodoApi,
  listTodos,
  setTodoDone as setTodoDoneApi,
  updateTodo as updateTodoApi,
} from "../api";
import type { CreateTodoInput, Todo } from "../types/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedTodo = useMemo(() => {
    return todos.find((todo) => todo._id === selectedTodoId) ?? null;
  }, [todos, selectedTodoId]);

  const loadTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const responseTodos = await listTodos();

      setTodos(responseTodos);

      setSelectedTodoId((currentSelectedId) => {
        const taskStillExists = responseTodos.some(
          (todo) => todo._id === currentSelectedId,
        );

        if (taskStillExists) {
          return currentSelectedId;
        }

        return responseTodos[0]?._id ?? null;
      });
    } catch (error) {
      console.error("Failed to load todos:", error);
      setError("Unable to load your tasks. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void loadTodos();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [loadTodos]);

  const addTodo = useCallback(async (input: CreateTodoInput) => {
    try {
      setError(null);

      const normalizedInput = {
        ...input,
        description: input.description ?? "",
      };

      const createdTodo = await createTodoApi(normalizedInput);

      setTodos((currentTodos) => [createdTodo, ...currentTodos]);
      setSelectedTodoId(createdTodo._id);
    } catch (error) {
      console.error("Failed to create todo:", error);
      setError("Unable to create the task.");
    }
  }, []);

  const toggleTodo = useCallback(
    async (todoId: string) => {
      const targetTodo = todos.find((todo) => todo._id === todoId);

      if (!targetTodo) {
        return;
      }

      const previousTodos = todos;
      const nextDoneState = !targetTodo.done;

      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo._id === todoId ? { ...todo, done: nextDoneState } : todo,
        ),
      );

      try {
        setError(null);

        const updatedTodo = await setTodoDoneApi(todoId, nextDoneState);

        setTodos((currentTodos) =>
          currentTodos.map((todo) =>
            todo._id === todoId ? updatedTodo : todo,
          ),
        );
      } catch (error) {
        console.error("Failed to update task status:", error);
        setTodos(previousTodos);
        setError("Unable to update the task status.");
      }
    },
    [todos],
  );

  const editTodo = useCallback(
    async (todoId: string, changes: Partial<CreateTodoInput>) => {
      try {
        setError(null);

        const currentTodo = todos.find((todo) => todo._id === todoId);
        if (!currentTodo) {
          return;
        }

        console.log("currentTodo:", currentTodo);
        console.log("changes:", changes);
        const updatedTodo = await updateTodoApi(todoId, {
          ...currentTodo,
          ...changes,
        });

        setTodos((currentTodos) =>
          currentTodos.map((todo) =>
            todo._id === todoId ? updatedTodo : todo,
          ),
        );
      } catch (error) {
        console.error("Failed to update todo:", error);
        setError("Unable to update the task.");
      }
    },
    [todos],
  );

  const removeTodo = useCallback(
    async (todoId: string) => {
      const previousTodos = todos;
      const deletedTodo = todos.find((todo) => todo._id === todoId);

      if (!deletedTodo) {
        return;
      }

      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo._id !== todoId),
      );

      if (selectedTodoId === todoId) {
        setSelectedTodoId(null);
      }

      try {
        setError(null);

        await deleteTodoApi(todoId);
      } catch (error) {
        console.error("Failed to delete todo:", error);
        setTodos(previousTodos);

        if (selectedTodoId === todoId) {
          setSelectedTodoId(todoId);
        }

        setError("Unable to delete the task.");
      }
    },
    [todos, selectedTodoId],
  );

  return {
    todos,
    selectedTodo,
    selectedTodoId,
    isLoading,
    error,
    loadTodos,
    addTodo,
    toggleTodo,
    editTodo,
    removeTodo,
    setSelectedTodoId,
    clearError: () => setError(null),
  };
}
