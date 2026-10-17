import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Signup from "@/models/auth/signup";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.fullName || !body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await Signup.findOne({ email: body.email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await Signup.create({
      fullName: body.fullName,
      email: body.email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { success: true, message: "Account created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


// import { NextRequest, NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
// import Signup from "@/models/auth/signup";
// import bcrypt from "bcryptjs";
// const existingUser = await Signup.findOne({ email: body.email });
// const hashedPassword = await bcrypt.hash(body.password, 10);


// export async function POST(req: NextRequest) {
//   try {
//     await connectDB();
//     console.log("Database connected successfully");

//     const body = await req.json();
//     console.log("Request body:", body);

//     // Validate required fields
//     if (!body.fullName || !body.email || !body.password) {
//       return NextResponse.json(
//         { success: false, message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, message: "Email already registered" },
//         { status: 400 }
//       );
//     }

//     const signup = await Signup.create({
//       fullName: body.fullName,
//       email: body.email,
//       password: hashedPassword,
//     });

//     console.log("Signup saved:", signup);

//     return NextResponse.json(
//       { success: true, message: "Signup form submitted successfully", signup },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error saving signup:", error);
//     const errorMessage = error instanceof Error ? error.message : "Unknown error";
//     return NextResponse.json(
//       { success: false, message: errorMessage },
//       { status: 500 }
//     );
//   }
// }
