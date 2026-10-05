import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import type {
  Notification,
  NotificationVariant,
} from "../../types/notification";
import { IconButton } from "./IconButton";

type ToastContainerProps = {
  notifications: Notification[];
  duration?: number;
  onClose: (toastId: string) => void;
};

type ToastProps = {
  notification: Notification;
  duration?: number;
  onClose: (toastId: string) => void;
};

type ToastStyle = {
  icon: typeof CheckCircle2;
  iconClassName: string;
  titleClassName: string;
  messageClassName: string;
  borderClassName: string;
};

const toastStyles: Record<NotificationVariant, ToastStyle> = {
  success: {
    icon: CheckCircle2,
    iconClassName: "bg-emerald-100 text-emerald-600",
    titleClassName: "text-emerald-950",
    messageClassName: "text-emerald-700",
    borderClassName: "border-emerald-200",
  },
  error: {
    icon: AlertCircle,
    iconClassName: "bg-red-100 text-red-600",
    titleClassName: "text-red-950",
    messageClassName: "text-red-700",
    borderClassName: "border-red-200",
  },
  info: {
    icon: Info,
    iconClassName: "bg-blue-100 text-blue-600",
    titleClassName: "text-blue-950",
    messageClassName: "text-blue-700",
    borderClassName: "border-blue-200",
  },
  warning: {
    icon: TriangleAlert,
    iconClassName: "bg-amber-100 text-amber-600",
    titleClassName: "text-amber-950",
    messageClassName: "text-amber-700",
    borderClassName: "border-amber-200",
  },
};

function Toast({ notification, duration = 3500, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  const style = toastStyles[notification.variant];
  const Icon = style.icon;

  const closeToast = () => {
    setVisible(false);

    window.setTimeout(() => {
      onClose(notification.id);
    }, 200);
  };

  useEffect(() => {
    const enterTimer = window.setTimeout(() => {
      setVisible(true);
    }, 20);

    const closeTimer = window.setTimeout(() => {
      closeToast();
    }, duration);

    return () => {
      window.clearTimeout(enterTimer);
      window.clearTimeout(closeTimer);
    };
  }, [notification.id, duration]);

  return (
    <article
      role={notification.variant === "error" ? "alert" : "status"}
      aria-live={notification.variant === "error" ? "assertive" : "polite"}
      className={[
        "pointer-events-auto flex w-full max-w-sm items-start gap-3",
        "rounded-2xl border bg-white p-3.5",
        "shadow-xl shadow-slate-900/10",
        "transition-all duration-200 ease-out",
        visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
        style.borderClassName,
      ].join(" ")}
    >
      <span
        className={[
          "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
          style.iconClassName,
        ].join(" ")}
      >
        <Icon size={19} strokeWidth={2.5} />
      </span>

      <div className="min-w-0 flex-1 pt-0.5">
        <p className={`text-sm font-bold ${style.titleClassName}`}>
          {notification.title}
        </p>

        {notification.message && (
          <p className={`mt-1 text-xs leading-5 ${style.messageClassName}`}>
            {notification.message}
          </p>
        )}
      </div>

      <IconButton
        label="Close notification"
        onClick={closeToast}
        className="h-7 w-7 shrink-0"
      >
        <X size={16} />
      </IconButton>
    </article>
  );
}

export function ToastContainer({
  notifications,
  onClose,
}: ToastContainerProps) {
  return (
    <div
      aria-label="Notifications"
      className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6"
    >
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          duration={notification.duration}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
