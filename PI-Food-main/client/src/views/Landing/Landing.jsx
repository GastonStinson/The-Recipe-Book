import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Landing.module.css";

function Landing() {
  return (
    <div className={style.landingContainer}>
      <div className={style.centerContainer}>
        <h1> The Recipe Book </h1>
        <p> Your Favourite Recipe and more! </p>
        <Link to="/home">
          <button>SEARCH NEW RECIPES</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
