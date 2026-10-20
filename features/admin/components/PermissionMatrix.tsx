import React from "react";

export interface PermissionItem {
  feature: string;
  student: boolean;
  teacher: boolean;
  admin: boolean;
}

export const DEFAULT_PERMISSIONS: PermissionItem[] = [
  { feature: "Access Student Portal & Courses", student: true, teacher: true, admin: true },
  { feature: "View Grades & Attendance Records", student: true, teacher: true, admin: true },
  { feature: "Upload Study Materials & Syllabus", student: false, teacher: true, admin: true },
  { feature: "Mark Attendance & Grade Submissions", student: false, teacher: true, admin: true },
  { feature: "Create & Edit School Assignments", student: false, teacher: true, admin: true },
  { feature: "View Faculty Roster & Department Analytics", student: false, teacher: true, admin: true },
  { feature: "Manage User Accounts & Edit Profiles", student: false, teacher: false, admin: true },
  { feature: "Assign & Modify User Roles (RBAC)", student: false, teacher: false, admin: true },
  { feature: "Database Seeding & System Configuration", student: false, teacher: false, admin: true },
];

export default function PermissionMatrix({
  items = DEFAULT_PERMISSIONS,
}: {
  items?: PermissionItem[];
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">RBAC Permission Matrix</h2>
        <p className="text-xs text-slate-500 mt-1">
          Role-Based Access Control policies enforced across Server Actions, API routes, and Middleware.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <th className="py-3 px-4">System Capability / Resource</th>
              <th className="py-3 px-4 text-center">Student (🎓)</th>
              <th className="py-3 px-4 text-center">Teacher (👨‍🏫)</th>
              <th className="py-3 px-4 text-center">Admin (🛡️)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition">
                <td className="py-3 px-4 font-medium text-slate-800">{item.feature}</td>
                <td className="py-3 px-4 text-center">
                  {item.student ? (
                    <span className="text-emerald-600 font-bold">✓ Granted</span>
                  ) : (
                    <span className="text-slate-300 font-bold">✕ Denied</span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  {item.teacher ? (
                    <span className="text-emerald-600 font-bold">✓ Granted</span>
                  ) : (
                    <span className="text-slate-300 font-bold">✕ Denied</span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  {item.admin ? (
                    <span className="text-purple-600 font-bold">✓ Full Access</span>
                  ) : (
                    <span className="text-slate-300 font-bold">✕ Denied</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
