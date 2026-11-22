import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard.jsx";
import { RECIPES_API_URL } from "../api.js";

function Home() {
  // State for the list of recipes, the loading message and any error message
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // useEffect runs after the page first appears.
  // We use it to load the recipes from the backend one time.
  useEffect(() => {
    async function loadRecipes() {
      try {
        const response = await fetch(RECIPES_API_URL);

        // Check that the server answered correctly
        if (!response.ok) {
          setMessage("Could not load recipes.");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setRecipes(data);
        setLoading(false);
      } catch (error) {
        setMessage("Could not connect to the server.");
        setLoading(false);
      }
    }

    loadRecipes();
  }, []); // [] means: run only one time

  // Delete a recipe, then remove it from the list on the screen
  async function handleDelete(recipeId) {
    const confirmed = window.confirm("Are you sure you want to delete this recipe?");

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(RECIPES_API_URL + "/" + recipeId, {
        method: "DELETE",
      });

      if (!response.ok) {
        setMessage("Could not delete the recipe.");
        return;
      }

      // Keep every recipe except the deleted one
      const remainingRecipes = recipes.filter(function (recipe) {
        return recipe._id !== recipeId;
      });
      setRecipes(remainingRecipes);
      setMessage("Recipe deleted.");
    } catch (error) {
      setMessage("Could not connect to the server.");
    }
  }

  return (
    <div>
      <h2>Discover Recipes</h2>
      <p>Share your favorite recipes and discover new dishes from other people.</p>
      <Link to="/add" className="btn btn-green">
        Add New Recipe
      </Link>

      {message ? <p className="message">{message}</p> : null}

      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
