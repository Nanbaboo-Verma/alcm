import React from "react";
import Link from "next/link";
import { requireRole } from "@/lib/auth/permissions";
import { LogoutButton } from "@/features/auth";

export const metadata = {
  title: "Teacher Portal - ALCM Modern Public School",
  description: "Role-based educator portal for class management, attendance, and grading",
};

export default async function TeacherDashboard() {
  const user = await requireRole(["teacher", "admin"]);

  const assignedClasses = [
    { section: "Grade 10-A", subject: "Mathematics", students: 38, room: "Room 204", attendanceTaken: true },
    { section: "Grade 9-B", subject: "Mathematics & Statistics", students: 42, room: "Room 102", attendanceTaken: false },
    { section: "Grade 11-Science", subject: "Calculus & Geometry", students: 34, room: "Lab C", attendanceTaken: true },
    { section: "Grade 8-C", subject: "Foundational Math", students: 28, room: "Room 105", attendanceTaken: false },
  ];

  const pendingGrading = [
    { assignment: "Mid-Term Algebra Exam", classSection: "Grade 10-A", submitted: 38, graded: 26 },
    { assignment: "Linear Equations Quiz #2", classSection: "Grade 9-B", submitted: 40, graded: 12 },
    { assignment: "Derivatives Homework #3", classSection: "Grade 11-Science", submitted: 33, graded: 33 },
  ];

  const todaySchedule = [
    { time: "09:00 AM - 10:00 AM", class: "Grade 10-A", topic: "Quadratic Equations Applications", status: "Completed" },
    { time: "11:15 AM - 12:15 PM", class: "Grade 9-B", topic: "Probability Basics & Dice Problems", status: "Upcoming" },
    { time: "02:00 PM - 03:00 PM", class: "Grade 11-Science", topic: "Limits & Continuous Functions", status: "Upcoming" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-emerald-950 text-white px-6 py-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/30 border border-emerald-300/40 text-emerald-100">
                👨‍🏫 Teacher Portal
              </span>
              <span className="text-xs text-emerald-200">Department: Mathematics & Computing</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mt-2">
              Instructor Dashboard: {user.name}
            </h1>
            <p className="text-sm text-emerald-200 mt-1">
              {user.email} • ALCM Modern Public School Faculty
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
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Students</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">142 Pupils</h3>
              <span className="inline-block mt-1 text-xs text-emerald-600 font-medium">Across 4 sections</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
              👥
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned Classes</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">4 Active</h3>
              <span className="inline-block mt-1 text-xs text-blue-600 font-medium">2 pending attendance</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
              🏫
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Grading Queue</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">40 Pending</h3>
              <span className="inline-block mt-1 text-xs text-amber-600 font-medium">2 assignments require review</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
              📋
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today&apos;s Lectures</p>
              <h3 className="text-2xl font-bold text-purple-600 mt-1">3 Classes</h3>
              <span className="inline-block mt-1 text-xs text-purple-600 font-medium">Next in 45 mins</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xl">
              ⏱️
            </div>
          </div>
        </div>

        {/* Classes Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Managed Classes Table/Cards */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Assigned Sections & Attendance</h2>
                  <p className="text-xs text-slate-500">Quick attendance recording and roster access</p>
                </div>
              </div>

              <div className="space-y-4">
                {assignedClasses.map((cls, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800 text-base">{cls.section}</h4>
                        <span className="text-xs bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded font-medium">
                          {cls.room}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {cls.subject} • {cls.students} Enrolled Students
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {cls.attendanceTaken ? (
                        <span className="px-3 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-lg">
                          ✓ Attendance Recorded
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          Mark Today&apos;s Attendance
                        </button>
                      )}
                      <button
                        type="button"
                        className="px-3 py-1.5 text-xs font-semibold border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition"
                      >
                        Roster
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grading Queue */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">✍️ Assessment & Grading Status</h2>
              <div className="space-y-4">
                {pendingGrading.map((item, idx) => {
                  const pct = Math.round((item.graded / item.submitted) * 100);
                  return (
                    <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-800 text-sm">{item.assignment}</h4>
                          <p className="text-xs text-slate-500">{item.classSection}</p>
                        </div>
                        <span className="text-xs font-bold text-slate-700">
                          {item.graded} / {item.submitted} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full mt-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            pct === 100 ? "bg-emerald-500" : "bg-blue-600"
                          }`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Today's Schedule & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-base font-bold text-slate-900 mb-4">⚡ Faculty Actions</h3>
              <div className="grid grid-cols-1 gap-2.5">
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-xs font-semibold text-slate-700 flex items-center justify-between transition"
                >
                  <span>📤 Upload Study Material / PDF</span>
                  <span>→</span>
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-xs font-semibold text-slate-700 flex items-center justify-between transition"
                >
                  <span>📝 Create New Assignment</span>
                  <span>→</span>
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-xs font-semibold text-slate-700 flex items-center justify-between transition"
                >
                  <span>📢 Broadcast Notice to Section</span>
                  <span>→</span>
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-xs font-semibold text-slate-700 flex items-center justify-between transition"
                >
                  <span>📅 View Term Academic Calendar</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-base font-bold text-slate-900 mb-4">🗓️ Today&apos;s Lectures</h3>
              <div className="space-y-3">
                {todaySchedule.map((slot, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{slot.class}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          slot.status === "Completed"
                            ? "bg-slate-200 text-slate-600"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {slot.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">⏰ {slot.time}</p>
                    <p className="text-xs text-slate-700 font-medium">{slot.topic}</p>
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
