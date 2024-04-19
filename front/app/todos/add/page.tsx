import { TodoAddForm } from "@/app/ui/form/todo/add";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-5 text-3xl font-bold text-gray-700">Add Todo</h1>
      <TodoAddForm />
    </div>
  );
}
