const mongoose = require("mongoose");

// This function connects our app to MongoDB using Mongoose
async function connectDB() {
  try {
    // MONGO_URI comes from the .env file so the password is not in the code
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed: " + error.message);
    // Stop the server because it cannot work without the database
    process.exit(1);
  }
}

module.exports = connectDB;
