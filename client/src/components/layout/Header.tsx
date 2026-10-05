import { CheckSquare2 } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex  flex-wrap items-center gap-1  border-slate-200 bg-gray-200 px-4 py-3 md:flex-nowrap md:gap-7 md:px-7">
      <a
        href="/"
        aria-label="My Todo home"
        className="inline-flex items-center gap-2 text-3xl font-bold text-slate-800"
      >
        <span className="grid h-6 w-6 place-items-center rounded-md bg-blue-600 text-white">
          <CheckSquare2 size={17} strokeWidth={3} />
        </span>
        Todo App
      </a>

      <div className="relative ml-auto">
        <img
          src="https://i.pravatar.cc/80?img=12"
          alt="Amila Tilakarathna"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>
    </header>
  );
}
