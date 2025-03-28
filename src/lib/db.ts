import mongoose from "mongoose";

const MONGODB_URI =
  import.meta.env.VITE_MONGODB_URI ||
  "mongodb://localhost:27017/ai-knowledge-sprout";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Handle connection errors after initial connection
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Handle application termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
