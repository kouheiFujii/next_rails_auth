import { cookies } from "next/headers";
import {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
} from "./definitions";

interface CRUD<T, U> {
  create: (data: T) => Promise<U>;
  read: () => Promise<U>;
  update: (data: T) => Promise<U>;
  delete: () => Promise<U>;
}

class Fetcher<T, U> implements CRUD<T, U> {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async create(data: T): Promise<U> {
    return this.send("POST", data);
  }

  async read(): Promise<U> {
    return this.send("GET");
  }

  async update(data: T): Promise<U> {
    return this.send("PUT", data);
  }

  async delete(): Promise<U> {
    return this.send("DELETE");
  }

  private async send<R>(method: string, data?: T): Promise<R> {
    const fullPath = `${process.env.NEXT_PUBLIC_BASE_URL}/${this.basePath}`;
    console.log("cookies", cookies().getAll());
    const accessToken = cookies().get("access-token")?.value ?? "";
    const client = cookies().get("client")?.value ?? "";
    const uid = cookies().get("uid")?.value ?? "";

    try {
      const response = await fetch(fullPath, {
        method,
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
          client: client,
          uid: uid,
        },
        body: data !== undefined ? JSON.stringify(data) : null,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const headers = response.headers;
      console.log("headers", headers);
      ["access-token", "client", "uid"].forEach((key) => {
        const value = headers.get(key);
        if (value) cookies().set(key, value);
      });

      return response.status !== 204 ? await response.json() : null;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
}

export const signupFetcher = new Fetcher<SignUpRequest, SignUpResponse>("auth");
export const loginFetcher = new Fetcher<LoginRequest, LoginResponse>(
  "auth/sign_in"
);
export const logoutFetcher = new Fetcher<{}, {}>("auth/sign_out");
