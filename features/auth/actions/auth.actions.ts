"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db/mongoose";
import User from "@/models/User";
import { comparePassword, hashPassword } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";
import { getCurrentUser, requireRole } from "@/lib/auth/permissions";
import {
  loginSchema,
  registerSchema,
  updateUserRoleSchema,
} from "../schemas/auth.schema";
import { ROLE_DASHBOARDS, type UserRole, type AuthUser } from "@/types/auth";

export type ActionResult<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  redirectTo?: string;
};

export async function loginAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult<AuthUser>> {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const parsed = loginSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message || "Invalid input.",
      };
    }

    const { email, password } = parsed.data;

    await connectDB();

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user || !user.isActive) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const role = user.role as UserRole;

    await createSession({
      userId: String(user._id),
      role,
      name: user.name,
      email: user.email,
    });

    const redirectTo = ROLE_DASHBOARDS[role] || "/";

    return {
      success: true,
      message: "Login successful.",
      data: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role,
      },
      redirectTo,
    };
  } catch (error) {
    console.error("loginAction error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function registerAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult<AuthUser>> {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role") || "student",
      adminPasscode: formData.get("adminPasscode") || undefined,
    };

    const parsed = registerSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message || "Invalid input.",
      };
    }

    const { name, email, password, role, adminPasscode } = parsed.data;

    let assignedRole: UserRole = "student";
    if (role === "teacher") {
      assignedRole = "teacher";
    } else if (role === "admin") {
      const allowedAdminPasscode = process.env.ADMIN_INVITE_CODE || "admin123";
      if (adminPasscode !== allowedAdminPasscode) {
        return {
          success: false,
          message: "Invalid admin passcode.",
        };
      }
      assignedRole = "admin";
    }

    await connectDB();

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: assignedRole,
      isActive: true,
    });

    return {
      success: true,
      message: `Account created successfully as ${assignedRole.toUpperCase()}. You can now log in.`,
      data: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      redirectTo: "/login",
    };
  } catch (error) {
    console.error("registerAction error:", error);
    return {
      success: false,
      message: "Registration failed. Please try again.",
    };
  }
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}

export async function getCurrentUserAction(): Promise<AuthUser | null> {
  return await getCurrentUser();
}

export async function updateUserRoleAction(
  targetUserId: string,
  newRole: UserRole
): Promise<ActionResult> {
  try {
    const adminUser = await requireRole(["admin"]);

    const parsed = updateUserRoleSchema.safeParse({
      userId: targetUserId,
      role: newRole,
    });

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message || "Invalid request.",
      };
    }

    await connectDB();

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    if (String(targetUser._id) === adminUser.id && newRole !== "admin") {
      return {
        success: false,
        message: "You cannot change your own admin role.",
      };
    }

    targetUser.role = newRole;
    await targetUser.save();

    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: `User ${targetUser.name} role updated to ${newRole.toUpperCase()}.`,
    };
  } catch (error) {
    console.error("updateUserRoleAction error:", error);
    return {
      success: false,
      message: "Failed to update user role.",
    };
  }
}

export async function seedDemoUsersAction(): Promise<ActionResult> {
  try {
    await connectDB();

    const demoUsers = [
      {
        name: "Admin Officer",
        email: "admin@alcm.edu",
        password: "Admin@123",
        role: "admin" as UserRole,
      },
      {
        name: "Professor Sharma",
        email: "teacher@alcm.edu",
        password: "Teacher@123",
        role: "teacher" as UserRole,
      },
      {
        name: "Aarav Kumar",
        email: "student@alcm.edu",
        password: "Student@123",
        role: "student" as UserRole,
      },
    ];

    let createdCount = 0;

    for (const demo of demoUsers) {
      const exists = await User.findOne({ email: demo.email });
      if (!exists) {
        const hashedPassword = await hashPassword(demo.password);
        await User.create({
          name: demo.name,
          email: demo.email,
          password: hashedPassword,
          role: demo.role,
          isActive: true,
        });
        createdCount++;
      }
    }

    return {
      success: true,
      message: `Demo users ready! (${createdCount} new created). You can log in using student@alcm.edu, teacher@alcm.edu, or admin@alcm.edu`,
    };
  } catch (error) {
    console.error("seedDemoUsersAction error:", error);
    return {
      success: false,
      message: "Failed to seed demo users.",
    };
  }
}
