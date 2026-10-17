import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongoose";

export async function GET() {
  try {
    const conn = await connectDB();

    return NextResponse.json(
      {
        success: true,
        message: "Connected to MongoDB successfully",
        database: conn.connection.db?.databaseName || "connected",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Database connection failed";
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
