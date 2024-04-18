import { Paths, fetcher } from "./fetcher";
import { TodosResponse, User } from "./definitions";

export const getMe = async () => {
  return await fetcher<{}, User>(Paths.me).read();
};

export const getTodos = async () => {
  return await fetcher<{}, TodosResponse>(Paths.todos).read();
};

export const createTodo = async (title: string) => {
  return await fetcher<{ title: string }, TodosResponse>(Paths.todos).create({
    title,
  });
};

export const updateTodo = async (
  id: number,
  title: string,
  completed: boolean
) => {
  "use server";
  return await fetcher<{ title: string; completed: boolean }, TodosResponse>(
    `${Paths.todos}/${id}`
  ).update({
    title,
    completed,
  });
};
