export default function Loading() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-slate-50 px-6"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="w-full max-w-md text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

        <h2 className="mt-6 text-xl font-semibold text-slate-900">
          Loading...
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Please wait while we prepare your page.
        </p>

        <div className="mt-8 animate-pulse space-y-3">
          <div className="mx-auto h-3 w-3/4 rounded bg-slate-200" />
          <div className="mx-auto h-3 w-1/2 rounded bg-slate-200" />
          <div className="mx-auto h-24 w-full rounded-xl bg-slate-200" />
        </div>
      </div>
    </main>
  );
}
