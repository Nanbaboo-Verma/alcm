import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-8xl font-extrabold text-indigo-600 sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-500">
          Sorry, the page you are looking for does not exist.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
