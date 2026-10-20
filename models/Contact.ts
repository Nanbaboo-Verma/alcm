import mongoose, { Schema, model, models } from "mongoose";

export interface IContact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  message: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = models.Contact || models.contact || model<IContact>("Contact", ContactSchema);

export default Contact;
