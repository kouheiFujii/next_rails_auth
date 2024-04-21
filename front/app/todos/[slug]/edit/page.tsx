import { getTodoById } from "@/app/lib/api";
import { EditTodoForm } from "@/app/ui/todos/edit-form";

export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug;
  const [data] = await Promise.all([getTodoById(id)]);
  if (!data) {
    return <div>Todo not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <EditTodoForm todo={data.todo} />
    </div>
  );
}
