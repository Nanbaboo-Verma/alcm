import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    const conn = await connectDB();
    console.log("Connection test successful");
    console.log("MongoDB URI:", process.env.MONGODB_URI);
    
    return Response.json(
      { 
        success: true, 
        message: "Connected to MongoDB",
        database: conn.connection.db.databaseName
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Connection test failed:", error);
    return Response.json(
      { 
        success: false, 
        message: error.message 
      },
      { status: 500 }
    );
  }
}
