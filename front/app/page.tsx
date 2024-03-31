import { LogoutButton } from "./ui/buttom/logout";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome TODO APP!</h1>
      <div>
        <LogoutButton />
      </div>
    </main>
  );
}
