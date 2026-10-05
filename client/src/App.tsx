import { AppLayout } from "./components/layout/AppLayout";
import { TodoPage } from "./components/todo/TodoPage";
import { useTodos } from "./hooks/useTodos";

export default function App() {
  const {
    todos,
    selectedTodo,
    selectedTodoId,
    isLoading,
    error,
    addTodo,
    editTodo,
    toggleTodo,
    removeTodo,
    setSelectedTodoId,
    clearError,
  } = useTodos();

  return (
    <AppLayout>
      {error && (
        <div
          role="alert"
          className="mb-4 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span>{error}</span>

          <button
            type="button"
            onClick={clearError}
            className="font-semibold hover:text-red-900"
          >
            Dismiss
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="grid min-h-80 place-items-center rounded-2xl border border-slate-200 bg-white text-sm font-medium text-slate-500 shadow-sm">
          Loading tasks…
        </div>
      ) : (
        <TodoPage
          todos={todos}
          selectedTodo={selectedTodo}
          selectedTodoId={selectedTodoId}
          onAddTodo={addTodo}
          onUpdateTodo={editTodo}
          onToggleTodo={toggleTodo}
          onDeleteTodo={removeTodo}
          onSelectTodo={setSelectedTodoId}
        />
      )}
    </AppLayout>
  );
}
