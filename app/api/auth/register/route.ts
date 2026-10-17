import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth/password";
import { registerSchema } from "@/app/features/auth/auth.validation";
import type { UserRole } from "@/types/auth";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message || "Please enter valid registration details.",
        },
        { status: 400 }
      );
    }

    const { name, email, password, role, adminPasscode } = parsed.data;

    // Security check for admin registration
    let assignedRole: UserRole = "student";
    if (role === "teacher") {
      assignedRole = "teacher";
    } else if (role === "admin") {
      const allowedAdminPasscode = process.env.ADMIN_INVITE_CODE || "admin123";
      if (adminPasscode !== allowedAdminPasscode) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid admin passcode. Contact system administrator.",
          },
          { status: 403 }
        );
      }
      assignedRole = "admin";
    }

    await connectDB();

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: assignedRole,
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Account created successfully as ${assignedRole.toUpperCase()}. Please log in.`,
        user: {
          id: String(user._id),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { success: false, message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    console.error("Registration error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
