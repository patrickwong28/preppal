import mongoose from "mongoose";

export interface UserInterface extends mongoose.Document {
  clerkUserId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserInterface>(
  {
    clerkUserId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

export const User =
  mongoose.models.User || mongoose.model<UserInterface>("User", userSchema);
