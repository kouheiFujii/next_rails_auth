import { getMe } from "@/app/lib/api";

export const Header = async () => {
  const me = await getMe();
  return (
    <header className="bg-blue-500 text-white p-4">
      <h1 className="text-2xl">Header</h1>
      <div>
        <p>{me.email}</p>
      </div>
    </header>
  );
};
