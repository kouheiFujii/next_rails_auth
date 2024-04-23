"use client";

import { deleteTodo } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export function DeleteTodo({ id }: { id: number }) {
  const [_, dispatch] = useFormState(deleteTodo, { id });
  return (
    <form action={dispatch}>
      <button className="px-3 py-2 bg-slate-400">Delete</button>
    </form>
  );
}
