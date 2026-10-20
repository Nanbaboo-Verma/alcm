import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import User from "@/models/User";
import { comparePassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { loginSchema } from "@/app/features/auth/auth.validation";
import { ROLE_DASHBOARDS, type UserRole } from "@/types/auth";

const DEMO_USERS: Record<string, { name: string; role: UserRole; pass: string }> = {
  "student@alcm.edu": { name: "Aarav Kumar", role: "student", pass: "Student@123" },
  "teacher@alcm.edu": { name: "Professor Sharma", role: "teacher", pass: "Teacher@123" },
  "admin@alcm.edu": { name: "Admin Officer", role: "admin", pass: "Admin@123" },
};

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message || "Invalid email or password.",
        },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    try {
      await connectDB();

      const user = await User.findOne({
        email: normalizedEmail,
      }).select("+password");

      if (!user || !user.isActive) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password." },
          { status: 401 }
        );
      }

      const isValid = await comparePassword(password, user.password);

      if (!isValid) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password." },
          { status: 401 }
        );
      }

      const role = user.role as UserRole;

      await createSession({
        userId: String(user._id),
        role,
        name: user.name,
        email: user.email,
      });

      const redirectTo = ROLE_DASHBOARDS[role] || "/";

      return NextResponse.json({
        success: true,
        message: "Login successful.",
        user: {
          id: String(user._id),
          name: user.name,
          email: user.email,
          role,
        },
        redirectTo,
      });
    } catch (dbError) {
      // Graceful fallback for demo accounts if DB connection is offline
      const demo = DEMO_USERS[normalizedEmail];
      if (demo && demo.pass === password) {
        await createSession({
          userId: `demo-${demo.role}`,
          role: demo.role,
          name: demo.name,
          email: normalizedEmail,
        });

        return NextResponse.json({
          success: true,
          message: "Login successful (Demo Mode).",
          user: {
            id: `demo-${demo.role}`,
            name: demo.name,
            email: normalizedEmail,
            role: demo.role,
          },
          redirectTo: ROLE_DASHBOARDS[demo.role],
        });
      }

      console.error("Login database error:", dbError);
      return NextResponse.json(
        {
          success: false,
          message: "Database connection pending. Please verify MONGODB_URI in .env.local or use demo accounts.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Login server error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
