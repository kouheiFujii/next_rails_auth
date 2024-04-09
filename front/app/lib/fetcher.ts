import { cookies } from "next/headers";
import {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
} from "./definitions";

const Paths = {
  auth: "auth",
  signIn: "auth/sign_in",
  signOut: "auth/sign_out",
} as const;

type Path = (typeof Paths)[keyof typeof Paths];

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface CRUD<T, U> {
  create: (data: T) => Promise<U>;
  read: (queryParams?: Record<string, string>) => Promise<U>;
  update: (data: T) => Promise<U>;
  delete: () => Promise<U>;
}

class Fetcher<T, U> implements CRUD<T, U> {
  private basePath: Path;

  constructor(basePath: Path) {
    this.basePath = basePath;
  }

  async create(data: T): Promise<U> {
    return this.send("POST", data);
  }

  async read(queryParams?: Record<string, string>): Promise<U> {
    return this.send("GET", undefined, queryParams);
  }

  async update(data: T): Promise<U> {
    return this.send("PUT", data);
  }

  async delete(): Promise<U> {
    return this.send("DELETE");
  }

  private async send<R>(
    method: HttpMethod,
    data?: T,
    queryParams?: Record<string, string>
  ): Promise<R> {
    let fullPath = `${process.env.NEXT_PUBLIC_BASE_URL}/${this.basePath}`;
    if (queryParams) {
      const queryString = new URLSearchParams(queryParams).toString();
      fullPath += `?${queryString}`;
    }

    const headers = this.getCommonHeaders();

    try {
      const response = await fetch(fullPath, {
        method,
        headers,
        body:
          method !== "GET" && method !== "DELETE" ? JSON.stringify(data) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.updateCookiesFromResponse(response.headers);

      return response.status !== 204 ? await response.json() : null;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  private getCommonHeaders(): HeadersInit {
    const accessToken = cookies().get("access-token")?.value ?? "";
    const client = cookies().get("client")?.value ?? "";
    const uid = cookies().get("uid")?.value ?? "";

    return {
      "Content-Type": "application/json",
      "access-token": accessToken,
      client,
      uid,
    };
  }

  private updateCookiesFromResponse(headers: Headers): void {
    ["access-token", "client", "uid"].forEach((key) => {
      const value = headers.get(key);
      if (value) cookies().set(key, value);
    });
  }
}

export const signupFetcher = new Fetcher<SignUpRequest, SignUpResponse>(
  Paths.auth
);
export const loginFetcher = new Fetcher<LoginRequest, LoginResponse>(
  Paths.signIn
);
export const logoutFetcher = new Fetcher<{}, {}>(Paths.signOut);
