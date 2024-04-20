import { getTodoById } from "@/app/lib/api";

export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug;
  const [data] = await Promise.all([getTodoById(id)]);
  if (!data) {
    return <div>Todo not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      edit page todo: {data.todo.title}
      {/* <h1 className="mb-5 text-3xl font-bold text-gray-700">Add Todo</h1>
      <TodoAddForm /> */}
    </div>
  );
}
