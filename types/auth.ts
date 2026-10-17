export type UserRole = "student" | "teacher" | "admin";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  isActive: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive?: boolean;
};

export type SessionPayload = {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
};

export const ROLE_DASHBOARDS: Record<UserRole, string> = {
  student: "/student/dashboard",
  teacher: "/teacher/dashboard",
  admin: "/admin/dashboard",
} as const;

export const ROLE_PERMISSIONS = {
  student: ["view_courses", "view_assignments", "view_attendance", "view_grades"],
  teacher: ["view_courses", "manage_assignments", "mark_attendance", "grade_students", "upload_materials"],
  admin: ["view_courses", "manage_assignments", "mark_attendance", "grade_students", "upload_materials", "manage_users", "manage_roles", "system_settings"],
} as const;
