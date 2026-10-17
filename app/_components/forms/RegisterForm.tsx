"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/types/auth";

export default function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("student");
  const [adminPasscode, setAdminPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          password,
          role,
          adminPasscode: role === "admin" ? adminPasscode : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      router.push("/login?registered=1");
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Role Selection Tabs */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          Select Your Account Role
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition cursor-pointer ${
              role === "student"
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            🎓 Student
          </button>
          <button
            type="button"
            onClick={() => setRole("teacher")}
            className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition cursor-pointer ${
              role === "teacher"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            👨‍🏫 Teacher
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition cursor-pointer ${
              role === "admin"
                ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            🛡️ Admin
          </button>
        </div>
      </div>

      {role === "admin" && (
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl space-y-1.5">
          <label htmlFor="adminPasscode" className="block text-xs font-bold text-purple-900">
            Admin Security Passcode
          </label>
          <input
            id="adminPasscode"
            name="adminPasscode"
            type="password"
            required
            value={adminPasscode}
            onChange={(e) => setAdminPasscode(e.target.value)}
            placeholder="Enter admin invite code (demo: admin123)"
            className="w-full rounded-lg border border-purple-300 px-3 py-1.5 text-xs bg-white outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="text-[11px] text-purple-700">
            Passcode required to prevent unauthorized administrator creation (Demo: <code className="font-mono bg-purple-100 px-1 rounded">admin123</code>).
          </p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          minLength={2}
          maxLength={100}
          required
          placeholder="e.g. Aarav Sharma"
          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
          placeholder="e.g. aarav@alcm.edu"
          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={6}
            maxLength={72}
            required
            placeholder="Min 6 characters"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={6}
            maxLength={72}
            required
            placeholder="Re-enter password"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {error && (
        <div role="alert" className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg">
          ✕ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-xl px-4 py-2.5 font-bold text-white transition disabled:opacity-50 cursor-pointer shadow-sm ${
          role === "admin"
            ? "bg-purple-600 hover:bg-purple-700"
            : role === "teacher"
            ? "bg-emerald-600 hover:bg-emerald-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading
          ? "Creating account..."
          : `Register as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
      </button>

      <p className="text-center text-xs text-slate-600 pt-2">
        Already registered?{" "}
        <Link href="/login" className="text-blue-600 hover:underline font-semibold">
          Sign In
        </Link>
      </p>
    </form>
  );
}
