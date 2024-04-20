import { LogoutButton } from "./ui/buttom/logout";
import { Header } from "./ui/header/header";
import { TodosTable } from "./ui/todos/table";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center space-y-5 p-24">
        <h1>Welcome TODO APP!</h1>
        <Link href="/todos/add" className="px-3 py-2 bg-slate-400 ">
          Add Todo
        </Link>
        <TodosTable></TodosTable>
        <div>
          <LogoutButton />
        </div>
      </main>
    </>
  );
}
