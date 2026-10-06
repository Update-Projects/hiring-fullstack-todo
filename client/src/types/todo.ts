export type Todo = {
  _id: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateTodoInput = {
  title: string;
  description?: string;
  done?: boolean;
};
