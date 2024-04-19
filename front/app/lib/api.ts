"use server";
import { Paths, fetcher } from "./fetcher";
import { TodoResponse, TodosResponse, User } from "./definitions";

export const getMe = async () => {
  return await fetcher<{}, User>(Paths.me).read();
};

export const getTodos = async () => {
  return await fetcher<{}, TodosResponse>(Paths.todos).read();
};

export const createTodo = async (title: string) => {
  return await fetcher<{ title: string }, TodoResponse>(Paths.todos).create({
    title,
  });
};

// export const updateTodo = async (
//   id: number,
//   title: string,
//   completed: boolean
// ) => {
//   return await fetcher<{ title: string; completed: boolean }, TodosResponse>(
//     `${Paths.todos}/${id}`
//   ).update({
//     title,
//     completed,
//   });
// };
