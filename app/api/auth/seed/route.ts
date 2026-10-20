import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth/password";
import type { UserRole } from "@/types/auth";

export async function POST() {
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

    const results = [];

    for (const demo of demoUsers) {
      const existing = await User.findOne({ email: demo.email });
      if (!existing) {
        const hashedPassword = await hashPassword(demo.password);
        const created = await User.create({
          name: demo.name,
          email: demo.email,
          password: hashedPassword,
          role: demo.role,
          isActive: true,
        });
        results.push({ email: created.email, role: created.role, status: "created" });
      } else {
        results.push({ email: existing.email, role: existing.role, status: "already_exists" });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Demo users created / verified successfully.",
      users: results,
      credentials: [
        { role: "admin", email: "admin@alcm.edu", password: "Admin@123" },
        { role: "teacher", email: "teacher@alcm.edu", password: "Teacher@123" },
        { role: "student", email: "student@alcm.edu", password: "Student@123" },
      ],
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to seed demo users." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
