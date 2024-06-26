export type User = {
  id: number;
  email: string;
  provider: string;
  uid: string;
  allow_password_change: boolean;
  name: string | null;
  nickname: string | null;
  image: string | null;
  created_at: string;
  updated_at: string;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  password_confirmation: string;
};

export type SignUpResponse = {
  status: string;
  data: User;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  data: User;
};

export type TodosResponse = {
  todos: Todo[];
};

export type TodoResponse = {
  todo: Todo;
};

export type TodoRequest = {
  title: string;
};
