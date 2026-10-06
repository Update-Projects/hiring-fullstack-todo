import { Trash2, X } from "lucide-react";
import type { Todo } from "../../types/todo";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";
import { Badge } from "../ui/Badge";
import { formatDateTime } from "../../lib/date";

type TaskDetailsProps = {
  todo: Todo | null;
  onDelete: (todo: Todo) => void;
  onClose: () => void;
};

export function TaskDetails({ todo, onDelete, onClose }: TaskDetailsProps) {
  return (
    <aside className="flex min-w-0 flex-col border-t border-slate-200 bg-white md:border-t-0 md:border-l">
      <header className="flex min-h-14 items-center justify-between border-b border-slate-100 px-4">
        <h2 className="text-xl font-bold text-slate-700">Task Details</h2>

        <IconButton label="Close details panel" onClick={onClose}>
          <X size={18} />
        </IconButton>
      </header>

      {!todo ? (
        <div className="p-5 text-md text-slate-500">
          Select a task to view its details.
        </div>
      ) : (
        <>
          <div className="flex-1 p-4">
            <h3 className="mb-2 text-sm font-semibold leading-relaxed text-slate-800">
              Created At
            </h3>
            <p className="mb-2 text-sm leading-relaxed text-slate-600">
              {todo.createdAt
                ? formatDateTime(todo.createdAt)
                : "No creation date available."}
            </p>

            <h3 className="mb-2 text-sm  font-semibold leading-relaxed text-slate-800">
              Updated At
            </h3>
            <p className="mb-2 text-sm leading-relaxed text-slate-600">
              {todo.updatedAt
                ? formatDateTime(todo.updatedAt)
                : "No update date available."}
            </p>

            <h3 className="mb-2 text-sm font-semibold leading-relaxed text-slate-800">
              Title
            </h3>
            <p className="mb-2 text-sm leading-relaxed text-slate-600">
              {todo.title || "No title available."}
            </p>

            <h3 className="mb-2 text-sm font-semibold text-slate-800">
              Status
            </h3>

            <p className="mb-4 text-sm text-slate-600">
              {todo.done ? (
                <Badge color="#eaf1ff">Marked as complete</Badge>
              ) : (
                <Badge color="#ffebee">Marked as incomplete</Badge>
              )}
            </p>

            <h3 className="mb-2 text-sm font-semibold leading-relaxed text-slate-800">
              Description
            </h3>

            <div className="grid gap-2">
              <p className="m-0 text-sm leading-relaxed text-slate-600">
                {todo.description || "No description available."}
              </p>
            </div>
          </div>

          <footer className="border-t border-slate-100 px-2 py-3">
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
          </footer>
        </>
      )}
    </aside>
  );
}
