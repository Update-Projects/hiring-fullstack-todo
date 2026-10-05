import type { Todo, TodoInput } from "./types";

//const BASE = `${import.meta.env.VITE_API_URL ?? ""}/api/todos`;
const BASE = `http://localhost:5000/api/todos`;

async function request<T>(path = "", options: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error(
      "Cannot reach the server. Check your connection and try again.",
    );
  }

  if (res.status === 204) return undefined as T;

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON response */
  }
  if (!res.ok) {
    const message = (data as { error?: string } | null)?.error;
    throw new Error(message || `Request failed (${res.status})`);
  }
  return data as T;
}

// GET /api/todos
export const listTodos = () => request<Todo[]>();

// POST /api/todos
export const createTodo = (input: TodoInput) =>
  request<Todo>("", { method: "POST", body: JSON.stringify(input) });

// PUT /api/todos/:id
export const updateTodo = (id: string, input: TodoInput) =>
  request<Todo>(`/${id}`, { method: "PUT", body: JSON.stringify(input) });

// PATCH /api/todos/:id/done
export const setTodoDone = (id: string, done: boolean) =>
  request<Todo>(`/${id}/done`, {
    method: "PATCH",
    body: JSON.stringify({ done }),
  });

// DELETE /api/todos/:id
export const deleteTodo = (id: string) =>
  request<void>(`/${id}`, { method: "DELETE" });
