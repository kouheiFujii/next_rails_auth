"use server";
import { Paths, fetcher } from "./fetcher";
import { TodoResponse, TodosResponse, User } from "./definitions";
import { wait } from "./helper";

export const getMe = async () => {
  try {
    const data = await fetcher<{}, User>(Paths.me).read();
    return data;
  } catch (error) {
    console.error("Failed to getMe:", error);
    throw error;
  }
};

export const getTodos = async () => {
  try {
    // 動作確認用
    // await wait(3000);
    const data = await fetcher<{}, TodosResponse>(Paths.todos).read();
    return data.todos;
  } catch (error) {
    console.error("Failed to getTodos:", error);
    throw error;
  }
};

export const getTodoById = async (id: string) => {
  try {
    const data = await fetcher<{}, TodoResponse>(`${Paths.todos}/${id}`).read();
    return data.todo;
  } catch (error) {
    console.error("Failed to getTodoById:", error);
    throw error;
  }
};

// ホントは actions に書くべき
export const createTodo = async (title: string) => {
  try {
    const data = await fetcher<{ title: string }, TodoResponse>(
      Paths.todos
    ).create({
      title,
    });
    return data.todo;
  } catch (error) {
    console.error("Failed to createTodo:", error);
    throw error;
  }
};
