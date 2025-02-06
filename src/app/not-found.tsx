import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h2>404 Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        Go Back To{" "}
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 underline underline-offset-4 transition-colors"
        >
          Home Page?
        </Link>
      </p>
    </div>
  );
}
