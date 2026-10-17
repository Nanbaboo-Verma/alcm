"use client";

import React, { useState } from "react";
import type { UserRole, AuthUser } from "@/types/auth";
import { updateUserRoleAction, seedDemoUsersAction } from "@/features/auth";

export interface ManagedUser extends AuthUser {
  createdAt?: string | Date;
}

export default function UserRoleManager({ initialUsers }: { initialUsers: ManagedUser[] }) {
  const [users, setUsers] = useState<ManagedUser[]>(initialUsers);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [filterRole, setFilterRole] = useState<string>("all");
  const [search, setSearch] = useState("");

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setUpdatingId(userId);
    setMessage(null);

    try {
      const res = await updateUserRoleAction(userId, newRole);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
        setMessage({ type: "success", text: res.message });
      } else {
        setMessage({ type: "error", text: res.message });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to update role." });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    setMessage(null);
    try {
      const res = await seedDemoUsersAction();
      setMessage({
        type: res.success ? "success" : "error",
        text: res.message,
      });
      if (res.success) {
        window.location.reload();
      }
    } catch {
      setMessage({ type: "error", text: "Failed to seed demo users." });
    } finally {
      setSeeding(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = filterRole === "all" || u.role === filterRole;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const roleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "teacher":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "student":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">User & Role Access Management</h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time RBAC directory. Instantly promote, reassign, or configure permissions for any user.
          </p>
        </div>

        <button
          onClick={handleSeed}
          disabled={seeding}
          className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition disabled:opacity-50 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <span>{seeding ? "⚙️ Seeding..." : "🌱 Seed Demo Accounts"}</span>
        </button>
      </div>

      {message && (
        <div
          className={`p-3.5 rounded-xl text-xs font-medium border ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 px-3.5 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-medium">Filter role:</span>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none bg-white font-medium text-slate-700 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles ({users.length})</option>
            <option value="student">Students ({users.filter((u) => u.role === "student").length})</option>
            <option value="teacher">Teachers ({users.filter((u) => u.role === "teacher").length})</option>
            <option value="admin">Admins ({users.filter((u) => u.role === "admin").length})</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Current Role</th>
              <th className="py-3 px-4">Account Status</th>
              <th className="py-3 px-4 text-right">Change Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  No users found. Click &quot;Seed Demo Accounts&quot; above to populate demo users.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs uppercase">
                        {u.name.slice(0, 2)}
                      </div>
                      <span className="font-semibold text-slate-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">{u.email}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${roleBadgeStyle(
                        u.role
                      )}`}
                    >
                      {u.role === "admin" && "🛡️ "}
                      {u.role === "teacher" && "👨‍🏫 "}
                      {u.role === "student" && "🎓 "}
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={u.role}
                      disabled={updatingId === u.id}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                      className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg outline-none font-medium bg-white hover:border-slate-400 focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50"
                    >
                      <option value="student">🎓 Student</option>
                      <option value="teacher">👨‍🏫 Teacher</option>
                      <option value="admin">🛡️ Admin</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
