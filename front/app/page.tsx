import { LogoutButton } from "./ui/buttom/logout";
import { Header } from "./ui/header/header";
import { TodosTable } from "./ui/table/todos";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center space-y-5 p-24">
        <h1>Welcome TODO APP!</h1>
        <TodosTable></TodosTable>
        <div>
          <LogoutButton />
        </div>
      </main>
    </>
  );
}
