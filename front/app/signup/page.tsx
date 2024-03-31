import { SignupForm } from "../ui/form/signup";

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 bg-gray-600">
        <SignupForm />
      </div>
    </main>
  );
}
