"use server";

import { redirect } from "next/navigation";
import { loginFetcher, logoutFetcher, signupFetcher } from "./fetcher";
import { cookies } from "next/headers";
import { log } from "console";

const isString = (value: unknown): value is string => {
  return typeof value === "string";
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

export const signup = async (prevState: SignUpState, formData: FormData) => {
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
    await signupFetcher.create({
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

export const login = async (prevState: LoginState, formData: FormData) => {
  const entries = Object.fromEntries(formData);
  const email = isString(entries.email) ? entries.email : "";
  const password = isString(entries.password) ? entries.password : "";
  console.log("email", email);
  if (email === "" || password === "") {
    return {
      errors: {
        email: ["can't be blank"],
        password: ["can't be blank"],
      },
    };
  }
  try {
    await loginFetcher.create({ email, password });
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
    await logoutFetcher.delete();
    ["access-token", "client", "uid"].forEach((key) => {
      cookies().delete(key);
    });
  } catch (error) {
    console.error("Failed to logout:", error);
  }
  redirect("/login");
};