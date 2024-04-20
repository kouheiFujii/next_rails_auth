"use server";
import { Paths, fetcher } from "./fetcher";
import { TodoResponse, TodosResponse, User } from "./definitions";

export const getMe = async () => {
  return await fetcher<{}, User>(Paths.me).read();
};

export const getTodos = async () => {
  return await fetcher<{}, TodosResponse>(Paths.todos).read();
};

export const getTodoById = async (id: string) => {
  return await fetcher<{}, TodoResponse>(`${Paths.todos}/${id}`).read();
};

export const createTodo = async (title: string) => {
  return await fetcher<{ title: string }, TodoResponse>(Paths.todos).create({
    title,
  });
};
