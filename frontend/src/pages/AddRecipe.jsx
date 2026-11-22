import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
  const navigate = useNavigate();

  // One state variable for each form field
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructions, setInstructions] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState("");

  // State for the success or error message
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    // Stop the browser from reloading the page
    e.preventDefault();

    // Turn the textarea text into an array (one ingredient per line)
    const ingredientsArray = ingredientsText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    const newRecipe = {
      title: title,
      author: author,
      category: category,
      description: description,
      ingredients: ingredientsArray,
      instructions: instructions,
      preparationTime: Number(preparationTime),
      cookingTime: Number(cookingTime),
      servings: Number(servings),
    };

    try {
      const response = await fetch("http://localhost:5000/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        setMessage("Error: could not save the recipe. Check the form.");
        return;
      }

      setMessage("Recipe added successfully!");

      // Reset the form
      setTitle("");
      setAuthor("");
      setCategory("");
      setDescription("");
      setIngredientsText("");
      setInstructions("");
      setPreparationTime("");
      setCookingTime("");
      setServings("");

      // Go back to the homepage
      navigate("/");
    } catch (error) {
      setMessage("Error: could not connect to the server.");
    }
  }

  return (
    <div className="form-box">
      <h2>Add New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Recipe Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="author">Author Name</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="ingredients">Ingredients (one per line)</label>
        <textarea
          id="ingredients"
          rows="5"
          value={ingredientsText}
          onChange={(e) => setIngredientsText(e.target.value)}
        />

        <label htmlFor="instructions">Cooking Instructions</label>
        <textarea
          id="instructions"
          rows="5"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <label htmlFor="preparationTime">Preparation Time (minutes)</label>
        <input
          id="preparationTime"
          type="number"
          min="0"
          value={preparationTime}
          onChange={(e) => setPreparationTime(e.target.value)}
        />

        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          id="cookingTime"
          type="number"
          min="0"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
        />

        <label htmlFor="servings">Number of Servings</label>
        <input
          id="servings"
          type="number"
          min="1"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
        />

        {message ? <p className="message">{message}</p> : null}

        <div className="card-buttons">
          <button type="submit" className="btn btn-green">
            Save Recipe
          </button>
          <button
            type="button"
            className="btn btn-red"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipe;
