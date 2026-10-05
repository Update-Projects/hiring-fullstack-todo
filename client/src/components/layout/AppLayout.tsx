import type { ReactNode } from "react";
import { Header } from "./Header";
import { Main } from "./Main";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50  text-slate-800">
      <Header />
      <Main>{children}</Main>
    </div>
  );
}
