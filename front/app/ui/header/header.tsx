import { User } from "@/app/lib/definitions";
import { Paths, fetcher } from "@/app/lib/fetcher";
import { log } from "console";
import { get } from "http";
import { cookies } from "next/headers";

async function getMe() {
  return await fetcher<{}, User>(Paths.me).read();
}

export const Header = async () => {
  // TODO: サーバーで2回呼ばれてる。いや、1回目はサーバーで呼ばれてるけど、2回目はクライアントで呼ばれてる？
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
