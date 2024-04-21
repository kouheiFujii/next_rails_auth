"use client";
import { updateTodo } from "@/app/lib/actions";
import { Todo } from "@/app/lib/definitions";
import { useFormState } from "react-dom";

export const EditTodoForm = ({ todo }: { todo: Todo }) => {
  const init = {
    message: "",
  };
  const [state, dispatch] = useFormState(updateTodo, init);

  return (
    <form className="w-full max-w-sm" action={dispatch}>
      <input type="hidden" name="id" defaultValue={todo.id} readOnly />
      {state.message && (
        <div className="text-red-500 text-sm">{state.message}</div>
      )}
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="title"
          >
            Title
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="title"
            type="text"
            name="title"
            defaultValue={todo.title}
          />
        </div>
        <div className="text-red-500 text-sm">
          {state.errors && state.errors.title?.join(", ")}
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="completed"
          >
            completed
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            name="completed"
            id="completed"
            defaultChecked={todo.completed}
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};
