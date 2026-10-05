import { useCallback, useState } from "react";
import type { Notification, NotificationVariant } from "../types/notification";

type ShowToastOptions = {
  title: string;
  message?: string;
  duration?: number;
};

export function useToast() {
  const [toasts, setToasts] = useState<Notification[]>([]);

  const showToast = useCallback(
    (
      variant: NotificationVariant,
      { title, message, duration }: ShowToastOptions,
    ) => {
      const toast: Notification = {
        id: crypto.randomUUID(),
        variant,
        title,
        message,
        duration,
      };

      setToasts((currentToasts) => [...currentToasts, toast]);
    },
    [],
  );

  const removeToast = useCallback((toastId: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== toastId),
    );
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    showToast,
    removeToast,
    clearToasts,
  };
}
