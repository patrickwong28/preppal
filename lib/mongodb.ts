import mongoose from "mongoose";
import { DB_URI } from "@/config/env";

declare global {
  var mongoose: any;
}

let cached = global.mongoose;

// conn stores resolved mongoose connection
// promise prevents multiple concurrent connect() calls
if (!cached) cached = global.mongoose = { conn: null, promise: null };

const connectToDatabase = async () => {
  if (!DB_URI) {
    throw new Error(
      "Please define the DB_URI environment vraiable inside .env.development.local",
    );
  }

  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const options = { bufferCommands: false };
    cached.promise = mongoose.connect(DB_URI, options);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export default connectToDatabase;
