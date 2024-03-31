import { logout } from "@/app/lib/actions";
export const LogoutButton = () => {
  return (
    <form action={logout}>
      <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
    </form>
  );
};
