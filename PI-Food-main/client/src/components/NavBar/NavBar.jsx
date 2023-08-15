import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function NavBar({ handleChange, handleSubmit }) {
  return (
    <div className={style.navBarContainer}>
      <Link to="/home">
        <h1> The Recipe Book </h1>
      </Link>
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
      <div>
        <Link to="/create">
          <button>Create New Recipe!</button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
