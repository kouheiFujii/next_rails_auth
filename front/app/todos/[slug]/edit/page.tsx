import { getTodoById } from "@/app/lib/api";
import { EditTodoForm } from "@/app/ui/todos/edit-form";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug;
  const [todo] = await Promise.all([getTodoById(id)]);
  if (!todo) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <EditTodoForm todo={todo} />
    </div>
  );
}
