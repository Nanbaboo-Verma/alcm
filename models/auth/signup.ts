import mongoose from "mongoose";

const SignupSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
     admin: {
      type: Boolean,
      required: false,
    },

  },
  { timestamps: true }
);

export default mongoose.models.Signup ||
  mongoose.model("Signup", SignupSchema);