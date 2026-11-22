import { useNavigate } from "react-router-dom";

// The recipe and the delete function are passed in as props from Home
function RecipeCard({ recipe, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p>
        <strong>Author:</strong> {recipe.author}
      </p>
      <p>
        <strong>Category:</strong> {recipe.category}
      </p>
      <p>
        <strong>Preparation:</strong> {recipe.preparationTime} min
      </p>
      <p>
        <strong>Cooking:</strong> {recipe.cookingTime} min
      </p>

      <div className="card-buttons">
        <button
          className="btn btn-green"
          onClick={() => navigate("/recipe/" + recipe._id)}
        >
          View Recipe
        </button>
        <button
          className="btn btn-green"
          onClick={() => navigate("/edit/" + recipe._id)}
        >
          Edit
        </button>
        <button className="btn btn-red" onClick={() => onDelete(recipe._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
