// Load the variables from the .env file (like MONGO_URI and PORT)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");

// Create the Express application
const app = express();

// Allow the React frontend (a different port) to talk to this server
app.use(cors());

// Allow the server to read JSON sent in request bodies
app.use(express.json());

// Every URL that starts with /api/recipes is handled by recipeRoutes
app.use("/api/recipes", recipeRoutes);

// A simple test route to check that the server is running locally
app.get("/", (req, res) => {
  res.send("Recipe Sharing Platform API is running");
});

// Use the port from .env, or 5000 if none is given
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

startServer();
