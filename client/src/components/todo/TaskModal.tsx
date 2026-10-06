import { useEffect, useState, type FormEvent } from "react";
import type { CreateTodoInput, Todo } from "../../types/todo";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

type TaskModalProps = {
  open: boolean;
  todo?: Todo | null;
  onClose: () => void;
  onSubmit: (data: CreateTodoInput) => void | Promise<void>;
};

const fieldClassName = [
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5",
  "text-sm text-slate-800 outline-none transition",
  "placeholder:text-slate-400",
  "focus:border-blue-500 focus:ring-4 focus:ring-blue-100",
].join(" ");

const emptyForm: CreateTodoInput = {
  title: "",
  description: "",
  done: false,
};

export function TaskModal({ open, todo, onClose, onSubmit }: TaskModalProps) {
  const isEditMode = Boolean(todo);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    setTitleError("");
    setDescriptionError("");

    if (todo) {
      setTitle(todo.title ?? "");
      setDescription(todo.description ?? "");
      setDone(todo.done);
      return;
    }

    setTitle(emptyForm.title);
    setDescription(emptyForm.description ?? "");
    setDone(emptyForm.done ?? false);
  }, [open, todo]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setTitleError("Task title is required.");
      return;
    }

    if (!trimmedDescription) {
      setDescriptionError("Task description is required.");
      return;
    }

    setTitleError("");
    setDescriptionError("");

    try {
      setIsSubmitting(true);

      await onSubmit({
        title: trimmedTitle,
        description: trimmedDescription,
        done,
      });

      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      title={isEditMode ? "Edit Task" : "Add New Task"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="grid gap-5 p-5">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Task Title
          <input
            autoFocus
            value={title}
            placeholder="e.g. Task title"
            onChange={(event) => {
              setTitle(event.target.value);

              if (titleError) {
                setTitleError("");
              }
            }}
            className={fieldClassName}
          />
        </label>
        <div
          className={[
            "overflow-hidden transition-all duration-200 ease-out",
            titleError ? "max-h-10 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <p
            id="task-title-error"
            role="alert"
            className="px-1 py-1 text-sm font-medium text-red-600"
          >
            {titleError}
          </p>
        </div>

        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Description
          <textarea
            rows={4}
            value={description}
            placeholder="Add details for this task..."
            onChange={(event) => {
              setDescription(event.target.value);

              if (descriptionError) {
                setDescriptionError("");
              }
            }}
            className={fieldClassName}
          />
        </label>
        <div
          className={[
            "overflow-hidden transition-all duration-200 ease-out",
            descriptionError ? "max-h-10 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <p
            id="task-description-error"
            role="alert"
            className=" px-1- py-1 text-sm font-medium text-red-600"
          >
            {descriptionError}
          </p>
        </div>
        {/*
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Status
          <select
            value={done ? "true" : "false"}
            onChange={(event) => setDone(event.target.value === "true")}
            className={fieldClassName}
          >
            <option value="false">To do</option>
            <option value="true">Completed</option>
          </select>
        </label>
        */}
        <footer className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <Button variant="secondary" disabled={isSubmitting} onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditMode ? "Save" : "Create Task"}
          </Button>
        </footer>
      </form>
    </Modal>
  );
}
