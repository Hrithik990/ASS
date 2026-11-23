// Load the variables from the .env file (like MONGO_URI and PORT)
require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");

// Create the Express application
const app = express();

// Connect to MongoDB
connectDB();

// Allow the React frontend (a different port) to talk to this server
app.use(cors());

// Allow the server to read JSON sent in request bodies
app.use(express.json());

// Every URL that starts with /api/recipes is handled by recipeRoutes
app.use("/api/recipes", recipeRoutes);

// --- Production: serve the React frontend build ---
if (process.env.NODE_ENV === "production") {
  // Serve the static files from the React build folder
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Any route that is NOT /api/* sends back index.html (for React Router)
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
} else {
  // A simple test route to check that the server is running (dev only)
  app.get("/", (req, res) => {
    res.send("Recipe Sharing Platform API is running");
  });
}

// Use the port from .env, or 5000 if none is given
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
