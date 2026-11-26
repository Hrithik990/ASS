const mongoose = require("mongoose");

// This function connects our app to MongoDB using Mongoose
async function connectDB() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not configured");
  }

  try {
    // MONGO_URI comes from the .env file so the password is not in the code
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    throw new Error("MongoDB connection failed: " + error.message);
  }
}

module.exports = connectDB;
