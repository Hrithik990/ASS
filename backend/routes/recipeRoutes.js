const express = require("express");
const Recipe = require("../models/Recipe");

// A router lets us keep all recipe routes in one separate file
const router = express.Router();

// GET /api/recipes
// Get all recipes from MongoDB (newest first)
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Could not get recipes" });
  }
});

// GET /api/recipes/:id
// Get one recipe using the id from the URL
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    // This also happens when the id is not a valid MongoDB id
    res.status(400).json({ message: "Invalid recipe id" });
  }
});

// POST /api/recipes
// Create a new recipe from the data sent by the frontend
router.post("/", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    // Validation errors (like a missing title) end up here
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/recipes/:id
// Find a recipe and update it with the new data
router.put("/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // new: true returns the updated recipe
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/recipes/:id
// Find a recipe and delete it
router.delete("/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid recipe id" });
  }
});

module.exports = router;
