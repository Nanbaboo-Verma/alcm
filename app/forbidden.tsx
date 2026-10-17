import Link from "next/link";
// 403 Access Denied

export default function Forbidden() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
          <svg
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.3 3.8 2.9 17a2 2 0 0 0 1.8 3h14.6a2 2 0 0 0 1.8-3L13.7 3.8a2 2 0 0 0-3.4 0Z"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-7xl font-extrabold tracking-tight text-slate-900">
          403
        </h1>

        <h2 className="mt-3 text-2xl font-bold text-slate-800">
          Access Denied
        </h2>

        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500">
          You don't have permission to access this resource. Please contact your
          administrator if you need access.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

// import { forbidden } from "next/navigation";

// export default async function AdminPage() {
//   const isAdmin = false; // Replace with server-side authorization

//   if (!isAdmin) {
//     forbidden();
//   }

//   return <h1>Admin Dashboard</h1>;
// }
