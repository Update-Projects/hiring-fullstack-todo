import type { Todo } from "../../types/todo";
import { TaskItem } from "./TaskItem";

type TaskListProps = {
  todos: Todo[];
  selectedTodoId: string | null;
  onSelectTodo: (todoId: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onToggleTodo: (todoId: string) => void;
};

export function TaskList({
  todos,
  selectedTodoId,
  onSelectTodo,
  onEdit,
  onDelete,
  onToggleTodo,
}: TaskListProps) {
  if (todos.length === 0) {
    return (
      <div className="px-5 py-16 text-center">
        <h3 className="mb-2 text-sm font-semibold text-slate-600">
          No tasks found
        </h3>
      </div>
    );
  }

  return (
    <section aria-label="Task list" className="border-t border-slate-100">
      {todos.map((todo) => (
        <TaskItem
          key={todo._id}
          todo={todo}
          selected={todo._id === selectedTodoId}
          onEdit={onEdit}
          onDelete={onDelete}
          onSelect={onSelectTodo}
          onToggle={onToggleTodo}
        />
      ))}
    </section>
  );
}
