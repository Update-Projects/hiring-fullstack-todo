import { useState } from "react";
import { Plus, CalendarDays } from "lucide-react";
import type { Todo, CreateTodoInput } from "../../types/todo";
import { Button } from "../ui/Button";
import { TaskDetails } from "./TaskDetails";
import { TaskList } from "./TaskList";
import { TaskModal } from "./TaskModal";
import { useToast } from "../../hooks/useToast";
import { ToastContainer } from "../ui/ToastContainer";
import { ConfirmModal } from "./ConfirmModal";
import { formatDateTime } from "../../lib/date";

type TodoPageProps = {
  todos: Todo[];
  selectedTodo: Todo | null;
  selectedTodoId: string | null;
  onAddTodo: (input: CreateTodoInput) => void;
  onUpdateTodo: (todoId: string, input: CreateTodoInput) => Promise<void>;
  onToggleTodo: (todoId: string) => Promise<void>;
  onDeleteTodo: (todoId: string) => Promise<void>;
  onSelectTodo: (todoId: string | null) => void;
};

export function TodoPage({
  todos,
  selectedTodo,
  selectedTodoId,
  onAddTodo,
  onUpdateTodo,
  onToggleTodo,
  onDeleteTodo,
  onSelectTodo,
}: TodoPageProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const { toasts, showToast, removeToast } = useToast();
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSelectTask = (todoId: string) => {
    onSelectTodo(todoId);
    setIsDetailsOpen(true);
  };

  const handleOpenCreateModal = () => {
    setEditingTodo(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTodo(null);
  };

  const handleTaskSubmit = async (input: CreateTodoInput) => {
    try {
      if (editingTodo) {
        await onUpdateTodo(editingTodo._id, input);

        showToast("success", {
          title: "Task updated",
          message: `"${input.title}" was updated.`,
        });
      } else {
        await onAddTodo(input);

        showToast("success", {
          title: "Task created",
          message: `"${input.title}" was added to your list.`,
        });
      }

      handleCloseTaskModal();
    } catch {
      showToast("error", {
        title: editingTodo ? "Could not update task" : "Could not create task",
        message: "Please try again.",
      });
    }
  };

  const handleRequestDelete = (todo: Todo) => {
    setIsDeleting(false);
    setTodoToDelete(todo);
  };

  const handleConfirmDelete = async () => {
    if (!todoToDelete) return;

    try {
      setIsDeleting(true);

      await onDeleteTodo(todoToDelete._id);

      showToast("success", {
        title: "Task deleted",
        message: `"${todoToDelete.title}" was removed.`,
      });

      setTodoToDelete(null);
    } catch {
      showToast("error", {
        title: "Could not delete task",
        message: "Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <ToastContainer notifications={toasts} onClose={removeToast} />
      <section
        className={[
          "grid  overflow-hidden rounded-lg border border-slate-200 bg-white",
          isDetailsOpen ? "md:grid-cols-[minmax(0,1fr)_300px]" : "grid-cols-1",
        ].join(" ")}
      >
        <div className="min-w-0 pt-5">
          <header className="flex items-start justify-between px-5 pb-4">
            <div>
              <h1 className="m-0 text-2xl font-bold text-slate-800">Today</h1>

              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-500">
                <CalendarDays
                  size={15}
                  className="text-blue-500"
                  aria-hidden="true"
                />
                {formatDateTime(new Date())}
              </p>
            </div>

            <Button onClick={() => handleOpenCreateModal()}>
              <Plus size={16} />
              Add Task
            </Button>
          </header>

          <TaskList
            todos={todos}
            selectedTodoId={selectedTodoId}
            onSelectTodo={handleSelectTask}
            onToggleTodo={onToggleTodo}
            onEdit={handleOpenEditModal}
            onDelete={handleRequestDelete}
          />
        </div>

        {isDetailsOpen && (
          <TaskDetails
            todo={selectedTodo}
            onDelete={handleRequestDelete}
            onClose={() => setIsDetailsOpen(false)}
          />
        )}
      </section>

      <TaskModal
        open={isTaskModalOpen}
        todo={editingTodo}
        onClose={handleCloseTaskModal}
        onSubmit={handleTaskSubmit}
      />

      <ConfirmModal
        open={Boolean(todoToDelete)}
        title="Delete this task?"
        description={
          <>
            Are you sure you want to delete ?{" "}
            <strong className="font-semibold text-slate-800">
              “{todoToDelete?.title}”
            </strong>
          </>
        }
        confirmLabel="Delete"
        cancelLabel="Keep"
        variant="danger"
        isLoading={isDeleting}
        onCancel={() => setTodoToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
