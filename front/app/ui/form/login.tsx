"use client";

import { login } from "@/app/lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";

export const LoginForm = () => {
  const init = {
    message: "",
  };
  const [state, dispatch] = useFormState(login, init);

  return (
    <div className="">
      <h1 className="text-2xl mb-4 text-center text-white">Login</h1>
      {state.message && (
        <div className="text-red-500 text-sm">{state.message}</div>
      )}
      <form className="flex flex-col space-y-4" action={dispatch}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state.errors && (
          <div className="text-red-500 text-sm">
            {state.errors.email?.join(", ")}
          </div>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state.errors && (
          <div className="text-red-500 text-sm">
            {state.errors.password?.join(", ")}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center w-full text-white">
        <Link href={"/signup"} className="underline">
          SignUp
        </Link>
      </div>
    </div>
  );
};
