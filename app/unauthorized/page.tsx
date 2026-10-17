import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/permissions";
import { ROLE_DASHBOARDS } from "@/types/auth";
import LogoutButton from "@/app/_components/forms/LogoutButton";

export default async function UnauthorizedPage() {
  const user = await getCurrentUser();

  const userDashboard = user ? ROLE_DASHBOARDS[user.role] : "/login";

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center p-6 text-center bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-3xl">
          🔒
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900">Access Restricted</h1>
        <h2 className="text-sm font-semibold text-amber-700 uppercase tracking-wider">
          Role-Based Access Policy Enforced
        </h2>

        <p className="text-xs text-slate-500 leading-relaxed">
          {user ? (
            <>
              You are signed in as <strong className="text-slate-800">{user.name}</strong> with role{" "}
              <span className="font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                {user.role}
              </span>
              . Your role does not have authorization to view this protected resource.
            </>
          ) : (
            "You need to sign in with an authorized account to access this page."
          )}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          {user ? (
            <>
              <Link
                href={userDashboard}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 font-semibold text-xs text-white hover:bg-blue-700 transition"
              >
                Go to My {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Portal
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 font-semibold text-xs text-white hover:bg-blue-700 transition"
            >
              Sign In with Authorized Account
            </Link>
          )}
        </div>

        <div className="pt-2">
          <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 underline">
            Return to School Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
