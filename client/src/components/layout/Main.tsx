import type { ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

export function Main({ children }: MainProps) {
  return <main className="px-4 py-3 md:px-7 md:pb-8">{children}</main>;
}
