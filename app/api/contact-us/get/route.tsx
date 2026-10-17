import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/contact";

export async function GET() {
  try {
    await connectDB();

    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, contacts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching contacts:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
