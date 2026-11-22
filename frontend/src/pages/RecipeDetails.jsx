import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function RecipeDetails() {
  // Get the id from the URL /recipe/:id
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Load this one recipe from the backend when the page opens
  useEffect(() => {
    async function loadRecipe() {
      try {
        const response = await fetch("http://localhost:5000/api/recipes/" + id);

        if (!response.ok) {
          setMessage("Recipe not found.");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        setMessage("Could not connect to the server.");
        setLoading(false);
      }
    }

    loadRecipe();
  }, [id]); // run again if the id changes

  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this recipe?");

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/recipes/" + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        setMessage("Could not delete the recipe.");
        return;
      }

      // Go back to the homepage after deleting
      navigate("/");
    } catch (error) {
      setMessage("Could not connect to the server.");
    }
  }

  if (loading) {
    return <p>Loading recipe...</p>;
  }

  if (!recipe) {
    return (
      <div>
        <p className="message">{message}</p>
        <Link to="/">Back to Recipes</Link>
      </div>
    );
  }

  return (
    <div className="details-box">
      <Link to="/">Back to Recipes</Link>

      <h2>{recipe.title}</h2>
      <p>
        <strong>Author:</strong> {recipe.author}
      </p>
      <p>
        <strong>Category:</strong> {recipe.category}
      </p>
      <p>
        <strong>Created:</strong> {new Date(recipe.createdAt).toLocaleDateString()}
      </p>
      <p>{recipe.description}</p>

      <p>
        <strong>Preparation time:</strong> {recipe.preparationTime} min
      </p>
      <p>
        <strong>Cooking time:</strong> {recipe.cookingTime} min
      </p>
      <p>
        <strong>Servings:</strong> {recipe.servings}
      </p>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p className="instructions">{recipe.instructions}</p>

      {message ? <p className="message">{message}</p> : null}

      <div className="card-buttons">
        <button
          className="btn btn-green"
          onClick={() => navigate("/edit/" + recipe._id)}
        >
          Edit
        </button>
        <button className="btn btn-red" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;
