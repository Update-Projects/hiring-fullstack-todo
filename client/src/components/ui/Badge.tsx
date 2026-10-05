import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  color?: string;
  className?: string;
};

export function Badge({
  children,
  color = "#eaf1ff",
  className = "",
}: BadgeProps) {
  return (
    <span
      style={{ backgroundColor: color }}
      className={[
        "inline-flex items-center rounded-full px-2 py-1",
        "text-[10px] font-semibold leading-none text-slate-600",
        "capitalize",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
