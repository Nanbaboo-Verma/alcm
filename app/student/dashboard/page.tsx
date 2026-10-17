import React from "react";
import Link from "next/link";
import { requireRole } from "@/lib/auth/permissions";
import { LogoutButton } from "@/features/auth";

export const metadata = {
  title: "Student Portal - ALCM Modern Public School",
  description: "Role-based student portal for courses, assignments, and attendance",
};

export default async function StudentDashboard() {
  const user = await requireRole(["student", "admin"]);

  const enrolledCourses = [
    { id: 1, name: "Advanced Mathematics", code: "MTH-101", teacher: "Prof. Sharma", progress: 78, nextClass: "Tomorrow 9:00 AM", room: "Room 204" },
    { id: 2, name: "Physical Science", code: "SCI-102", teacher: "Dr. A. Verma", progress: 85, nextClass: "Today 1:30 PM", room: "Science Lab B" },
    { id: 3, name: "English Literature", code: "ENG-103", teacher: "Mrs. C. Gupta", progress: 92, nextClass: "Wednesday 11:00 AM", room: "Room 108" },
    { id: 4, name: "Computer Science & AI", code: "CS-104", teacher: "Mr. R. Singh", progress: 64, nextClass: "Thursday 10:00 AM", room: "Computer Lab 1" },
  ];

  const pendingAssignments = [
    { title: "Calculus Problem Set #4", course: "Advanced Mathematics", dueDate: "Tomorrow, 11:59 PM", status: "Due Soon", urgency: "high" },
    { title: "Physics Lab Experiment Report", course: "Physical Science", dueDate: "Friday, 5:00 PM", status: "In Progress", urgency: "medium" },
    { title: "Essay on Shakespearean Tragedy", course: "English Literature", dueDate: "Next Monday", status: "Pending", urgency: "normal" },
  ];

  const announcements = [
    { date: "Oct 20, 2026", title: "Mid-Term Examinations Schedule Published", author: "Examination Cell" },
    { date: "Oct 18, 2026", title: "Annual Science Exhibition Registration Open", author: "Dept of Sciences" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white px-6 py-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/30 border border-blue-300/40 text-blue-100">
                🎓 Student Portal
              </span>
              <span className="text-xs text-blue-200">ID: STU-{user.id.slice(-6).toUpperCase()}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mt-2">
              Welcome back, {user.name}
            </h1>
            <p className="text-sm text-blue-200 mt-1">
              Class X-A • Academic Year 2026-2027 • ALCM Modern Public School
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
            >
              School Website
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendance Rate</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">94.8%</h3>
              <span className="inline-block mt-1 text-xs text-emerald-600 font-medium">✓ Excellent standing</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
              📊
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current GPA</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">3.88 / 4.0</h3>
              <span className="inline-block mt-1 text-xs text-blue-600 font-medium">Rank #4 in class</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl">
              🏆
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Courses</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">6 Subjects</h3>
              <span className="inline-block mt-1 text-xs text-slate-500 font-medium">All terms ongoing</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
              📚
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Tasks</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">3 Assignments</h3>
              <span className="inline-block mt-1 text-xs text-amber-600 font-medium">1 due tomorrow</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
              ⏳
            </div>
          </div>
        </div>

        {/* Courses & Assignments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Courses (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Enrolled Courses</h2>
                  <p className="text-xs text-slate-500">Academic semester progress and schedule</p>
                </div>
                <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
                  Semester 1
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrolledCourses.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-200 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded">
                          {c.code}
                        </span>
                        <h4 className="font-semibold text-slate-800 mt-1">{c.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Instructor: {c.teacher}</p>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{c.progress}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all"
                        style={{ width: `${c.progress}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-500">
                      <span>🕒 {c.nextClass}</span>
                      <span className="font-medium text-slate-700">{c.room}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* School Announcements */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">📢 Official Notices</h2>
              <div className="divide-y divide-slate-100">
                {announcements.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Issued by {item.author}</p>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pending Assignments & Student Profile */}
          <div className="space-y-6">
            {/* Student Info Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-3">{user.name}</h3>
              <p className="text-xs text-slate-500">{user.email}</p>
              <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                ● Enrolled Active Student
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 text-left space-y-2 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Roll Number:</span>
                  <span className="font-semibold text-slate-800">2026-X-442</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Batch / Class:</span>
                  <span className="font-semibold text-slate-800">Grade 10 - Section A</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">School Branch:</span>
                  <span className="font-semibold text-slate-800">Ujjaini Kalan, Gonda</span>
                </div>
              </div>
            </div>

            {/* Assignments Due */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">📝 Pending Assignments</h2>
              <div className="space-y-3">
                {pendingAssignments.map((task, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        {task.course}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          task.urgency === "high"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800">{task.title}</h4>
                    <p className="text-xs text-slate-500">⏰ {task.dueDate}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
