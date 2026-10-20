import { NextResponse } from "next/server";
import { randomBytes, createHash } from "node:crypto";
import { connectDB } from "@/lib/db/mongoose";
import User from "@/models/User";
import { forgotPasswordSchema } from "@/app/features/auth/auth.validation";
import { sendPasswordResetEmail } from "@/lib/email/send-email";

export async function POST(request: Request) {
  const genericMessage =
    "If an account exists for that email, a reset link will be sent.";

  try {
    const body: unknown = await request.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({
      email: parsed.data.email.toLowerCase(),
      isActive: true,
    });

    // Don't reveal whether an email is registered.
    if (!user) {
      return NextResponse.json({ message: genericMessage });
    }

    const token = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");

    user.resetPasswordToken = tokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const appUrl = process.env.APP_URL;

    if (!appUrl) {
      throw new Error("APP_URL is not configured");
    }

    const resetUrl = new URL("/reset-password", appUrl);
    resetUrl.searchParams.set("token", token);

    await sendPasswordResetEmail(user.email, resetUrl.toString());

    return NextResponse.json({ message: genericMessage });
  } catch (error) {
    console.error("Forgot password error:", error);

    return NextResponse.json(
      { message: "Unable to process your request right now." },
      { status: 500 }
    );
  }
}
