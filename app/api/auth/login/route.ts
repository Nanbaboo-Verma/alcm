import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Signup from "@/models/auth/signup";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password required" },
        { status: 400 }
      );
    }

    // find user
    const user = await Signup.findOne({ email });
    console.log(user, "userr");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // create token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        admin: user.admin,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import User from "@/models/User";
import { comparePassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { loginSchema } from "@/features/auth/auth.validation";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    await connectDB();

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user || !user.isActive) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    await createSession({
      userId: String(user._id),
      role: user.role,
    });

    const dashboardByRole = {
      student: "/student/dashboard",
      teacher: "/teacher/dashboard",
      admin: "/admin/dashboard",
    } as const;

    return NextResponse.json({
      message: "Login successful.",
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      redirectTo: dashboardByRole[user.role],
    });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
