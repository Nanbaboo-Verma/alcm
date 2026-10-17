"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email") }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Request failed.");
        return;
      }

      setMessage(data.message);
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
          Registered email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="e.g. user@alcm.edu"
          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {message && (
        <p role="status" className="text-xs text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
          {message}
        </p>
      )}
      {error && (
        <p role="alert" className="text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer shadow-sm"
      >
        {loading ? "Sending..." : "Send reset link"}
      </button>

      <Link
        href="/login"
        className="block text-center text-xs text-blue-600 hover:underline"
      >
        Back to login
      </Link>
    </form>
  );
}
