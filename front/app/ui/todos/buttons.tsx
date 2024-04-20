import Link from "next/link";

export function UpdateTodo({ id }: { id: number }) {
  return (
    <Link href={`/todos/${id}/edit`} className="px-3 py-2 bg-slate-400">
      Update
    </Link>
  );
}
