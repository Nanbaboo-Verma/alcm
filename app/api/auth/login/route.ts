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
      console.log(user,"userr")

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
          admin:user.admin
        },
      });

    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Server error" },
        { status: 500 }
      );
    }
  }
