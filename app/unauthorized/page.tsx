import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-bold">403</h1>
      <h2 className="mt-4 text-xl font-semibold">Access denied</h2>
      <p className="mt-2 text-gray-500">
        You do not have permission to access this page.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        Go to Home
      </Link>
    </main>
  );
}
