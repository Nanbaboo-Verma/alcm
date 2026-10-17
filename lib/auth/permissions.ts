import { redirect } from "next/navigation";
import { getSession } from "./session";
import { connectDB } from "@/lib/db/mongoose";
import User, { type UserRole } from "@/models/User";

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) return null;

  await connectDB();

  const user = await User.findById(session.userId)
    .select("name email role isActive")
    .lean();

  if (!user || !user.isActive) return null;

  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role as UserRole,
  };
}

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!allowedRoles.includes(user.role)) {
    redirect("/unauthorized");
  }

  return user;
}
