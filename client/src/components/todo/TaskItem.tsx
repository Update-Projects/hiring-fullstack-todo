import { Check, Pen, Trash2, CalendarDays } from "lucide-react";
import type { Todo } from "../../types/todo";
import { Button } from "../ui/Button";

type TaskItemProps = {
  todo: Todo;
  selected: boolean;
  onSelect: (todoId: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onToggle: (todoId: string) => void;
};

export function TaskItem({
  todo,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onToggle,
}: TaskItemProps) {
  const handleSelect = () => {
    onSelect(todo._id);
  };

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onToggle(todo._id);
  };

  function formatTodoDate(dateValue?: string) {
    if (!dateValue) {
      return "No due date";
    }

    return new Date(dateValue).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <article
      className={[
        "group relative flex cursor-pointer items-start gap-3",
        "border-b border-slate-100 px-4 py-4 transition-colors",
        selected ? "bg-blue-50/60" : "bg-white hover:bg-slate-50/80",
      ].join(" ")}
      onClick={handleSelect}
    >
      {selected && (
        <span className="absolute inset-y-0 left-0 w-1 rounded-r-full bg-blue-600" />
      )}

      <button
        type="button"
        aria-label={
          todo.done
            ? `Mark ${todo.title} as incomplete`
            : `Mark ${todo.title} as complete`
        }
        aria-pressed={todo.done}
        onClick={handleToggle}
        className={[
          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2",
          "transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-100",
          todo.done
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-slate-300 bg-white hover:border-blue-500",
        ].join(" ")}
      >
        {todo.done && <Check size={13} strokeWidth={3.5} />}
      </button>

      <div className="min-w-0 flex-1">
        <h3
          className={[
            "truncate font-semibold transition-colors",
            todo.done
              ? "text-slate-400 line-through"
              : "text-slate-800 group-hover:text-blue-700",
          ].join(" ")}
        >
          {todo.title}
        </h3>

        {todo.createdAt && (
          <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-slate-500">
            <CalendarDays size={14} className="shrink-0 text-blue-500" />

            <span>Created {formatTodoDate(todo.createdAt)}</span>
          </div>
        )}

        {todo.description && (
          <p className="mt-1 line-clamp-1 text-sm leading-5 text-slate-500">
            {todo.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="success"
          className="bg-transparent hover:bg-transparent hover:text-green-300"
          onClick={() => onEdit(todo)}
        >
          <Pen
            size={16}
            className="
                    transition-transform duration-200
                    group-hover:scale-100
                    group-hover:rotate-[-10deg]"
          />
          Edit
        </Button>
        |
        <Button
          variant="danger"
          className="bg-transparent hover:bg-transparent hover:text-red-300"
          onClick={() => onDelete(todo)}
        >
          <Trash2
            size={16}
            className="
                    transition-transform duration-200
                    group-hover:scale-100
                    group-hover:rotate-[-10deg]
                    "
          />
          Delete
        </Button>
      </div>
    </article>
  );
}
