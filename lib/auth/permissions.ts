import { redirect } from "next/navigation";
import { getSession } from "./session";
import { connectDB } from "@/lib/db/mongoose";
import User from "@/models/User";
import type { UserRole, AuthUser } from "@/types/auth";

export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getSession();

  if (!session) return null;

  try {
    await connectDB();

    const user = await User.findById(session.userId)
      .select("name email role isActive")
      .lean<{ _id: unknown; name: string; email: string; role: UserRole; isActive: boolean } | null>();

    if (!user || !user.isActive) return null;

    return {
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  } catch {
    // Fallback to session payload if database connection is temporarily pending
    return {
      id: session.userId,
      name: session.name || "User",
      email: session.email || "",
      role: session.role,
      isActive: true,
    };
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireRole(allowedRoles: UserRole[]): Promise<AuthUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!allowedRoles.includes(user.role)) {
    redirect("/unauthorized");
  }

  return user;
}

export function hasRole(role: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(role);
}
