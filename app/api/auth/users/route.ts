import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import User from "@/models/User";
import { requireRole } from "@/lib/auth/permissions";
import { updateUserRoleSchema } from "@/app/features/auth/auth.validation";

export async function GET() {
  try {
    const admin = await requireRole(["admin"]);
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await connectDB();
    const users = await User.find({})
      .select("name email role isActive createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      users: users.map((u) => ({
        id: String(u._id),
        name: u.name,
        email: u.email,
        role: u.role,
        isActive: u.isActive,
        createdAt: u.createdAt,
      })),
    });
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json(
      { message: "Unauthorized or failed to fetch users" },
      { status: 403 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const admin = await requireRole(["admin"]);
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = updateUserRoleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message || "Invalid role data" },
        { status: 400 }
      );
    }

    const { userId, role } = parsed.data;

    await connectDB();

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (String(targetUser._id) === admin.id && role !== "admin") {
      return NextResponse.json(
        { message: "You cannot demote your own admin account." },
        { status: 400 }
      );
    }

    targetUser.role = role;
    await targetUser.save();

    return NextResponse.json({
      success: true,
      message: `Role updated to ${role}`,
      user: {
        id: String(targetUser._id),
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role,
      },
    });
  } catch (error) {
    console.error("Update role error:", error);
    return NextResponse.json(
      { message: "Failed to update user role." },
      { status: 500 }
    );
  }
}
