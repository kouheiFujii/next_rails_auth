"use client";

import { signup } from "@/app/lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";

export const SignupForm = () => {
  const init = {
    message: "",
  };
  const [state, dispatch] = useFormState(signup, init);

  return (
    <div className="">
      <h1 className="text-2xl mb-4 text-center text-white">SignUp</h1>
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
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state.errors && (
          <div className="text-red-500 text-sm">
            {state.errors.password_confirmation?.join(", ")}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          SignUp
        </button>
      </form>

      <div className="mt-6 text-center w-full text-white">
        <Link href={"/login"} className="underline">
          Login
        </Link>
      </div>
    </div>
  );
};
