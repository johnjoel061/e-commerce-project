import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  const mongoURL = process.env.MONGODB_URL;
  const dbName = process.env.DB_NAME || ""; 

  if (!mongoURL) {
    throw new Error("Missing MONGODB_URL in environment variables.");
  }

  try {
    await mongoose.connect(mongoURL, {
      dbName: dbName,
    });

    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Let the caller handle the failure
  }
};
