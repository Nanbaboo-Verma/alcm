import Link from "next/link";

export default function Custom404() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-xl text-center">
        <h1 className="mb-4 text-[120px] font-extrabold leading-none tracking-tight text-indigo-600 sm:text-[180px]">
          404
        </h1>

        <h2 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
          Page not found
        </h2>

        <p className="mx-auto mb-8 max-w-md text-base leading-7 text-slate-500">
          The page you are looking for doesn't exist or may have been moved to
          another location.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        >
          Return to Home
        </Link>

        <p className="mt-10 text-sm text-slate-400">Error code: 404</p>
      </div>
    </main>
  );
}
