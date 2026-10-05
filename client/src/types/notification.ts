export type NotificationVariant = "success" | "error" | "info" | "warning";

export type Notification = {
  id: string;
  variant: NotificationVariant;
  title: string;
  message?: string;
  duration?: number;
};
