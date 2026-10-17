import React from "react";
import Link from "next/link";
import { requireRole } from "@/lib/auth/permissions";
import { connectDB } from "@/lib/db/mongoose";
import User from "@/models/User";
import { LogoutButton } from "@/features/auth";
import { UserRoleManager, PermissionMatrix } from "@/features/admin";
import type { UserRole } from "@/types/auth";

export const metadata = {
  title: "Admin Command Center - ALCM Modern Public School",
  description: "Role-based administrative control for users, roles, and system permissions",
};

export default async function AdminDashboard() {
  const admin = await requireRole(["admin"]);

  let rawUsers: { _id: unknown; name: string; email: string; role: UserRole; isActive: boolean; createdAt?: Date }[] = [];

  try {
    await connectDB();
    rawUsers = await User.find({})
      .select("name email role isActive createdAt")
      .sort({ createdAt: -1 })
      .lean<{ _id: unknown; name: string; email: string; role: UserRole; isActive: boolean; createdAt?: Date }[]>();
  } catch {
    rawUsers = [
      { _id: "demo-admin", name: "Admin Officer", email: "admin@alcm.edu", role: "admin", isActive: true, createdAt: new Date() },
      { _id: "demo-teacher", name: "Professor Sharma", email: "teacher@alcm.edu", role: "teacher", isActive: true, createdAt: new Date() },
      { _id: "demo-student", name: "Aarav Kumar", email: "student@alcm.edu", role: "student", isActive: true, createdAt: new Date() },
    ];
  }

  const users = rawUsers.map((u) => ({
    id: String(u._id),
    name: u.name,
    email: u.email,
    role: u.role,
    isActive: u.isActive,
    createdAt: u.createdAt ? u.createdAt.toISOString() : undefined,
  }));

  const totalUsers = users.length;
  const studentCount = users.filter((u) => u.role === "student").length;
  const teacherCount = users.filter((u) => u.role === "teacher").length;
  const adminCount = users.filter((u) => u.role === "admin").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white px-6 py-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/30 border border-purple-300/40 text-purple-200">
                🛡️ Administrator Command Center
              </span>
              <span className="text-xs text-indigo-300">Level: Super Admin</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mt-2">
              System Control: {admin.name}
            </h1>
            <p className="text-sm text-indigo-200 mt-1">
              {admin.email} • Full Access Privilege • ALCM Modern Public School
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
            >
              School Home
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Registered</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalUsers} Users</h3>
              <span className="inline-block mt-1 text-xs text-indigo-600 font-medium">All database accounts</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl">
              👥
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Students</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">{studentCount} Students</h3>
              <span className="inline-block mt-1 text-xs text-blue-600 font-medium">Portal access enabled</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
              🎓
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Teachers / Faculty</p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-1">{teacherCount} Teachers</h3>
              <span className="inline-block mt-1 text-xs text-emerald-600 font-medium">Class management access</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
              👨‍🏫
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Admins</p>
              <h3 className="text-2xl font-bold text-purple-600 mt-1">{adminCount} Administrators</h3>
              <span className="inline-block mt-1 text-xs text-purple-600 font-medium">System governance</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xl">
              🛡️
            </div>
          </div>
        </div>

        {/* Live User and Role Management Table Component */}
        <UserRoleManager initialUsers={users} />

        {/* Role Permissions Matrix */}
        <PermissionMatrix />

        {/* Quick Portal Switcher */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/60 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base">Quick Portal Previews (Admin Privilege)</h3>
            <p className="text-xs text-slate-600 mt-1">
              As an administrator, you have access to preview both the Student and Teacher portals.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/student/dashboard"
              className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition"
            >
              Preview Student Portal →
            </Link>
            <Link
              href="/teacher/dashboard"
              className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition"
            >
              Preview Teacher Portal →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
