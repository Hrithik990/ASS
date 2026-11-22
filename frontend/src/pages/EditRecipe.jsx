import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RECIPES_API_URL } from "../api.js";

function EditRecipe() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Load the existing recipe and put its values into the form
  useEffect(() => {
    async function loadRecipe() {
      try {
        const response = await fetch(RECIPES_API_URL + "/" + id);

        if (!response.ok) {
          setMessage("Recipe not found.");
          setLoading(false);
          return;
        }

        const recipe = await response.json();

        setTitle(recipe.title);
        setAuthor(recipe.author);
        setCategory(recipe.category || "");
        setDescription(recipe.description || "");
        // Turn the ingredients array into text with one ingredient per line
        setIngredientsText(recipe.ingredients.join("\n"));
        setInstructions(recipe.instructions || "");
        setPreparationTime(recipe.preparationTime);
        setCookingTime(recipe.cookingTime);
        setServings(recipe.servings);
        setLoading(false);
      } catch (error) {
        setMessage("Could not connect to the server.");
        setLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    // Turn the textarea text back into an array
    const ingredientsArray = ingredientsText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    const updatedRecipe = {
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
      const response = await fetch(RECIPES_API_URL + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRecipe),
      });

      if (!response.ok) {
        setMessage("Error: could not update the recipe. Check the form.");
        return;
      }

      // Go to the details page of this recipe
      navigate("/recipe/" + id);
    } catch (error) {
      setMessage("Error: could not connect to the server.");
    }
  }

  if (loading) {
    return <p>Loading recipe...</p>;
  }

  return (
    <div className="form-box">
      <h2>Edit Recipe</h2>

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
            Update Recipe
          </button>
          <button
            type="button"
            className="btn btn-red"
            onClick={() => navigate("/recipe/" + id)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRecipe;
