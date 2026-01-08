import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) {
    console.log("Using cached database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Creating new database connection...");
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((connection) => {
      console.log("Connected to MongoDB successfully");
      return connection;
    }).catch((error) => {
      console.error("MongoDB connection error:", error.message);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
