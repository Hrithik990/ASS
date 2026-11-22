import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Recipe Sharing Platform</h1>

      <div className="nav-links">
        {/* NavLink changes the page without reloading the browser */}
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add">Add Recipe</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
