import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
};

export function IconButton({
  label,
  children,
  type = "button",
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={[
        "grid h-8 w-8 place-items-center rounded-md",
        "text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700",
        "focus:outline-none focus:ring-2 focus:ring-blue-400",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
