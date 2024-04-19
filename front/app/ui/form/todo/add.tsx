"use client";

import { createTodo } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
// client components で実装する練習

/**
 * 【あえて起こしているバグ】
 * 追加しても遷移後の todo には反映されない
 * これは TodoTable はクライアント側で実行されているコンポーネントであり、
 * router.push はクライアント側で完結するためサーバー側にはいかない
 * よって、サーバー側でレンダリングされている TodoTable には反映されない
 */
export const TodoAddForm = () => {
  const [todo, setTodo] = useState("");
  const router = useRouter();
  const handleSubmit = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      await createTodo(todo);
      router.push("/");
    },
    [todo, router]
  );
  return (
    <form className="w-full max-w-sm">
      <div className="flex items-center border-b-2 border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Title"
          aria-label="Title"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </form>
  );
};
