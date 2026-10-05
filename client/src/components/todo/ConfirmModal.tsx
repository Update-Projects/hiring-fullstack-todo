import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import { Modal } from "../ui//Modal";

type ConfirmVariant = "danger" | "warning" | "primary";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  isLoading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

const variantStyles: Record<
  ConfirmVariant,
  {
    icon: string;
    button: string;
  }
> = {
  danger: {
    icon: "bg-red-100 text-red-600",
    button:
      "bg-red-600 text-white shadow-sm shadow-red-600/25 hover:bg-red-700 focus:ring-red-100",
  },
  warning: {
    icon: "bg-amber-100 text-amber-600",
    button:
      "bg-amber-500 text-white shadow-sm shadow-amber-500/25 hover:bg-amber-600 focus:ring-amber-100",
  },
  primary: {
    icon: "bg-blue-100 text-blue-600",
    button:
      "bg-blue-600 text-white shadow-sm shadow-blue-600/25 hover:bg-blue-700 focus:ring-blue-100",
  },
};

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const styles = variantStyles[variant];
  const descriptionId = "confirm-modal-description";

  return (
    <Modal open={open} title={title} onClose={onCancel}>
      <div className="p-6">
        <div
          id={descriptionId}
          className="mt-2 text-sm leading-6 text-slate-600"
        >
          {description}
        </div>
      </div>

      <footer className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
        <Button
          variant="secondary"
          disabled={isLoading}
          onClick={onCancel}
          className="w-full sm:w-auto"
        >
          {cancelLabel}
        </Button>

        <button
          type="button"
          disabled={isLoading}
          onClick={() => void onConfirm()}
          className={[
            "inline-flex w-full items-center justify-center gap-2 rounded-lg",
            "px-3.5 py-2 text-sm font-semibold transition",
            "focus:outline-none focus:ring-4",
            "disabled:cursor-not-allowed disabled:opacity-60",
            "sm:w-auto",
            styles.button,
          ].join(" ")}
        >
          {isLoading ? "Please wait..." : confirmLabel}
        </button>
      </footer>
    </Modal>
  );
}
