"use server";

import { redirect } from "next/navigation";
import { Paths, fetcher } from "./fetcher";
import { cookies } from "next/headers";
import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
  TodosResponse,
} from "./definitions";

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

const isBoolean = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export type SignUpState = {
  errors?: {
    email?: string[];
    password?: string[];
    password_confirmation?: string[];
  };
  message?: string | null;
};

export type TodoState = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

export const signup = async (_: SignUpState, formData: FormData) => {
  const entries = Object.fromEntries(formData);
  const email = isString(entries.email) ? entries.email : "";
  const password = isString(entries.password) ? entries.password : "";
  const password_confirmation = isString(entries.password_confirmation)
    ? entries.password_confirmation
    : "";
  // TODO: ちゃんとしたバリデーション
  if (email === "" || password === "" || password_confirmation === "") {
    return {
      errors: {
        email: ["can't be blank"],
        password: ["can't be blank"],
        password_confirmation: ["can't be blank"],
      },
      message: null,
    };
  }

  try {
    await fetcher<SignUpRequest, SignUpResponse>(Paths.auth).create({
      email,
      password,
      password_confirmation,
    });
  } catch (error) {
    return {
      message: `Failed to sign up: ${error}`,
    };
  }
  redirect("/");
};

export const login = async (_: LoginState, formData: FormData) => {
  const entries = Object.fromEntries(formData);
  const email = isString(entries.email) ? entries.email : "";
  const password = isString(entries.password) ? entries.password : "";
  if (email === "" || password === "") {
    return {
      errors: {
        email: ["can't be blank"],
        password: ["can't be blank"],
      },
    };
  }
  try {
    await fetcher<LoginRequest, LoginResponse>(Paths.signIn).create({
      email,
      password,
    });
  } catch (error) {
    return {
      message: `Failed to login: ${error}`,
    };
  }
  redirect("/");
};

export const logout = async () => {
  "use server";
  try {
    await fetcher<{}, {}>(Paths.signOut).delete();
    ["access-token", "client", "uid"].forEach((key) => {
      cookies().delete(key);
    });
  } catch (error) {
    console.error("Failed to logout:", error);
  }
  redirect("/login");
};

export const updateTodo = async (_: TodoState, formData: FormData) => {
  const entries = Object.fromEntries(formData);
  const id = isString(entries.id) ? entries.id : "";
  const title = isString(entries.title) ? entries.title : "";
  const completed = entries.completed === "on" ? true : false;

  if (title === "") {
    return {
      errors: {
        title: ["can't be blank"],
      },
    };
  }
  try {
    await fetcher<{ title: string; completed: boolean }, TodosResponse>(
      `${Paths.todos}/${id}`
    ).update({
      title,
      completed,
    });
  } catch (error) {
    return {
      message: `Failed to updateTodo: ${error}`,
    };
  }
  redirect("/");
};
