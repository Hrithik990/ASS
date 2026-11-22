const mongoose = require("mongoose");

// The schema describes what a recipe looks like in the database
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  // A list of text values, one per ingredient
  ingredients: {
    type: [String],
  },
  instructions: {
    type: String,
  },
  preparationTime: {
    type: Number,
    min: [0, "Preparation time cannot be negative"],
  },
  cookingTime: {
    type: Number,
    min: [0, "Cooking time cannot be negative"],
  },
  servings: {
    type: Number,
    min: [1, "Servings must be at least 1"],
  },
  // Filled in automatically with the current date
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// The model is what we use in the routes to talk to the "recipes" collection
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
