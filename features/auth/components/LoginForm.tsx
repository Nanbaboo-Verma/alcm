"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";
  const registered = searchParams.get("registered");

  const { refreshUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fillDemo = (role: "student" | "teacher" | "admin") => {
    setError("");
    if (role === "student") {
      setEmail("student@alcm.edu");
      setPassword("Student@123");
    } else if (role === "teacher") {
      setEmail("teacher@alcm.edu");
      setPassword("Teacher@123");
    } else if (role === "admin") {
      setEmail("admin@alcm.edu");
      setPassword("Admin@123");
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid credentials. Please try again.");
        return;
      }

      if (typeof window !== "undefined" && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      await refreshUser();

      const target = redirectUrl || data.redirectTo || "/";
      router.replace(target);
      router.refresh();
    } catch {
      setError("Unable to connect. Please check network/database.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Demo Credentials Quick-Fill Buttons */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center justify-between">
          <span>⚡ Instant Demo Logins</span>
          <span className="text-[10px] text-blue-600 font-normal">Click to autofill</span>
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => fillDemo("student")}
            className="px-2.5 py-2 text-xs font-semibold bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-600 hover:text-white transition shadow-xs cursor-pointer text-center"
          >
            🎓 Student
          </button>
          <button
            type="button"
            onClick={() => fillDemo("teacher")}
            className="px-2.5 py-2 text-xs font-semibold bg-white border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-600 hover:text-white transition shadow-xs cursor-pointer text-center"
          >
            👨‍🏫 Teacher
          </button>
          <button
            type="button"
            onClick={() => fillDemo("admin")}
            className="px-2.5 py-2 text-xs font-semibold bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-600 hover:text-white transition shadow-xs cursor-pointer text-center"
          >
            🛡️ Admin
          </button>
        </div>
      </div>

      {registered && (
        <div className="p-3 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg">
          ✓ Account created successfully! Please log in below.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. student@alcm.edu"
            maxLength={254}
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            maxLength={72}
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline font-medium"
          >
            Forgot password?
          </Link>
          <span className="text-slate-400">Secure 256-bit Session</span>
        </div>

        {error && (
          <div role="alert" className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg">
            ✕ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50 shadow-sm cursor-pointer"
        >
          {loading ? "Signing in..." : "Sign In to Portal"}
        </button>

        <p className="text-center text-xs text-slate-600 pt-2">
          Need an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
