import Link from "next/link";

const Notfound = () => {
  return (
    <main className="container mx-auto px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
        <Link href="/" className="text-blue-500">
          Go back to Todos
        </Link>
      </div>
    </main>
  );
};

export default Notfound;
