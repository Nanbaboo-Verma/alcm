import connectDB from "@/lib/mongodb";
import Contact from "@/models/contact";

export async function POST(req) {
  try {
    await connectDB();
    console.log("Database connected successfully");

    const body = await req.json();
    console.log("Request body:", body);

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.phoneNumber || !body.message) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const contact = await Contact.create({
      firstName: body.firstName,
      lastName: body.lastName,
      phoneNumber: body.phoneNumber,
      message: body.message,
    });

    console.log("Contact saved:", contact);

    return Response.json(
      { success: true, message: "Contact form submitted successfully", contact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
